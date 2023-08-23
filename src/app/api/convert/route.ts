import { convertDocxToHtmlWithouchImage } from '@/app/api/mammoth.utils';
import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export const GET = async (req: Request, res: Response) => {
  console.log("estou funcionando GET")
}
export const POST = async (req: Request) => {
  try {
    const docxDirectory = 'assets/docx';
    const htmlOutputDirectory = 'assets/html';

    const docxFiles = fs.readdirSync(docxDirectory);

    if (!fs.existsSync(htmlOutputDirectory)) {
      fs.mkdirSync(htmlOutputDirectory);
    }

    const convertedFiles = [];

    for (const docxFile of docxFiles) {
      if (docxFile.endsWith('.docx')) {
        const docxPath = path.join(docxDirectory, docxFile);
        const destinationFolderName = docxFile.replace('.docx', '');
        const destinationPath = path.join(htmlOutputDirectory, destinationFolderName);

        if (!fs.existsSync(destinationPath)) {
          fs.mkdirSync(destinationPath);
        }

        const htmlContent = await convertDocxToHtmlWithouchImage(docxPath);

        const htmlFileName = 'index.html';
        const outputPath = path.join(destinationPath, htmlFileName);
        fs.writeFileSync(outputPath, htmlContent);

        convertedFiles.push({ docx: docxFile, html: path.join(destinationFolderName, htmlFileName) });
      }
    }

    return NextResponse.json({
      message: 'Conversion successful',
      convertedFiles: convertedFiles,
    }, { status: 200 });
  } catch (err) {
    console.error('Error converting:', err);
    return NextResponse.json(
      { error: 'Conversion failed', err },
      { status: 500 }
    );
  }
}
