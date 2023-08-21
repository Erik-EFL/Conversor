import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import convertDocxToHtml from '@/app/api/mammoth.utils';

export const GET = async (req: Request, res: Response) => {
  console.log("estou funcionando GET")
}
export const POST = async (req: Request) => {
  try {
    const docxDirectory = 'src/assets/docx';
    const htmlOutputDirectory = 'src/assets/html';

    const docxFiles = fs.readdirSync(docxDirectory);

    if (!fs.existsSync(htmlOutputDirectory)) {
      fs.mkdirSync(htmlOutputDirectory);
    }

    const convertedFiles = [];

    for (const docxFile of docxFiles) {
      if (docxFile.endsWith('.docx')) {
        const docxPath = path.join(docxDirectory, docxFile);
        const htmlContent = await convertDocxToHtml(docxPath);

        const htmlFileName = `${docxFile.replace('.docx', '.html')}`;
        const outputPath = path.join(htmlOutputDirectory, htmlFileName);
        fs.writeFileSync(outputPath, htmlContent);

        convertedFiles.push({ docx: docxFile, html: htmlFileName });
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
