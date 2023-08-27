import { ContentFormat, convertDocxToHtmlWithImage, convertDocxToHtmlWithouchImage } from '@/app/api/mammoth.utils';
import { directory } from '@/core/provider/pathProvider';
import fs from 'fs';
import { readdir, unlink } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';


export async function GET() {
  try {
    const targetFolder = join(process.cwd(), directory.HtmlPath);
    const files = await readdir(targetFolder);

    const data = files.filter(item => item !== '.gitkeep')

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to retrieve files" });
  }
}

export async function POST(request: Request) {
  try {
    const requestBody = await request.json()
    const { convertFormat } = requestBody
    const docxFiles = await fs.promises.readdir(directory.DocxPath);

    if (!fs.existsSync(directory.HtmlPath)) {
      fs.mkdirSync(directory.HtmlPath);
    }

    const convertedFiles = [];

    for (const docxFile of docxFiles) {
      if (docxFile.endsWith('.docx')) {
        const docxPath = join(directory.DocxPath, docxFile);
        let htmlContent = '';

        if (convertFormat === ContentFormat.WithMetaAndImages) {
          htmlContent = await convertDocxToHtmlWithImage(docxPath);
        } else if (convertFormat === ContentFormat.WithoutMetaAndImages) {
          htmlContent = await convertDocxToHtmlWithouchImage(docxPath);
        }

        const htmlFileName = `${
          convertFormat === ContentFormat.WithMetaAndImages ? 'editor_' : ''
        }${docxFile.replace('.docx', '.html')}`;

        const outputPath = join(directory.HtmlPath, htmlFileName);
        await fs.promises.writeFile(outputPath, htmlContent);

        convertedFiles.push({ html: htmlFileName });
      }
    }

    return new NextResponse(
      JSON.stringify({
        message: 'Conversion Complete',
        convertedFiles: convertedFiles,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    console.error('Error converting:', err);
    return new NextResponse(
      JSON.stringify({ error: 'Conversion failed', err }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export const DELETE = async (request: NextRequest) => {
  try {
    const header = request.headers.get('x-invoke-query');

    if (!header) return NextResponse.json('Arquivo não encontrado ou inexistente', { status: 404 })

    const decodedString = decodeURIComponent(header);

    const parsedObject = JSON.parse(decodedString);

    const fileName = parsedObject.filename;

    if (!fileName) {
      return NextResponse.json({ success: false, message: 'Filename not provided' });
    }

    const targetFolder = join(process.cwd(), directory.HtmlPath);
    const filePath = join(targetFolder, fileName);

    await unlink(filePath);

    return NextResponse.json({ success: true, message: 'Arquivo Deletado com Sucesso' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json({ message: 'Error deleting file' }, { status: 400 });
  }
}
