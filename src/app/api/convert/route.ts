import { ContentFormat, convertDocxToHtmlWithImage, convertDocxToHtmlWithouchImage } from '@/app/api/mammoth.utils';
import { directory } from '@/core/provider/pathProvider';
import fs from 'fs';
import { unlink } from 'fs/promises';
import { StatusCodes } from 'http-status-codes';
import { NextRequest, NextResponse } from 'next/server';
import path, { join } from 'path';
import { checkDirectoryExists, checkFileExists, logger, readDirectory, sanitizeData } from '../utils/functions.utils';

export async function GET() {
  try {
    const folderExists = await checkDirectoryExists(directory.HtmlPath);

    if (folderExists) {
      const files = await readDirectory(directory.HtmlPath);
      const sanitizedData = sanitizeData(files);
      return NextResponse.json({ success: true, data: sanitizedData }, { status: StatusCodes.OK });
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'Error' && error.message.startsWith('ENOENT')) {
        logger.error(`Directory not found: ${directory.HtmlPath}`);
        return NextResponse.json({ success: false, error: "Directory not found" });
      } else {
        logger.error(error);
        return NextResponse.json({ success: false }, {status: StatusCodes.BAD_REQUEST});
      }
    } else {
      logger.error('Unknown error:', error);
      return NextResponse.json({ success: false, error: "Unknown error" });
    }
  }
}

export async function POST(request: Request) {
  try {
    const requestBody = await request.json()
    const { convertFormat } = requestBody
    const docxFiles = await fs.promises.readdir(directory.DocxPath);

    const directoryExists = await fs.promises.access(directory.HtmlPath)
      .then(() => true)
      .catch(() => false);

    if (!directoryExists) {
      await fs.promises.mkdir(directory.HtmlPath, { recursive: true });
    }

    const convertedFiles = await Promise.all(docxFiles.map(async (docxFile) => {
      if (path.extname(docxFile).toLowerCase() === '.docx') {
        const docxPath = join(directory.DocxPath, docxFile);
        let htmlContent = '';

        switch (convertFormat) {
          case ContentFormat.WithMetaAndImages:
            htmlContent = await convertDocxToHtmlWithImage(docxPath);
            break;
          case ContentFormat.WithoutMetaAndImages:
            htmlContent = await convertDocxToHtmlWithouchImage(docxPath);
            break;
        }

        const htmlFileName = `${
          convertFormat === ContentFormat.WithMetaAndImages ? 'editor_' : ''
        }${docxFile.replace('.docx', '.html')}`;

        const outputPath = path.resolve(directory.HtmlPath, htmlFileName);

        const writeStream = fs.createWriteStream(outputPath);
        writeStream.write(htmlContent);
        writeStream.end();

        return { html: htmlFileName };
      }
    }));

    return new NextResponse(
      JSON.stringify({
        message: 'Conversion Complete',
        convertedFiles: convertedFiles,
      }),
      { status: StatusCodes.OK, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    logger.error('Error converting:', err);
    return new NextResponse(
      JSON.stringify({ error: 'Conversion failed', err }),
      { status: StatusCodes.BAD_REQUEST, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export const DELETE = async (request: NextRequest) => {
  try {
    const header = request.headers.get('x-invoke-query');

    if (!header) return NextResponse.json('Arquivo não encontrado ou inexistente', { status: StatusCodes.NOT_FOUND })

    let parsedObject;
    try {
      const decodedString = decodeURIComponent(header);
      parsedObject = JSON.parse(decodedString);
    } catch (error) {
      logger.error('Error parsing JSON:', error);
      return NextResponse.json({ message: 'Error parsing JSON' }, { status: StatusCodes.BAD_REQUEST });
    }

    const fileName = parsedObject.filename;

    if (!fileName) {
      return NextResponse.json({ success: false, message: 'Filename not provided' });
    }

    const filePath = join(directory.HtmlPath, fileName);
    const fileExists = await checkFileExists(filePath);

    if (fileExists) {
      await unlink(filePath);
    }

    return NextResponse.json({ success: true, message: 'Arquivo Deletado com Sucesso' }, { status: StatusCodes.OK });
  } catch (error) {
    logger.error('Error deleting file:', error);
    return NextResponse.json({ message: 'Error deleting file' }, { status: StatusCodes.BAD_REQUEST });
  }
}
