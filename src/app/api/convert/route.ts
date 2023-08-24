import { convertDocxToHtmlWithouchImage } from '@/app/api/mammoth.utils';
import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export const GET = async () => {
  return NextResponse.json({ status: 'Aguardando' }, { status: 200 });
};
export const POST = async () => {
  try {
    const docxDirectory = 'public/assets/docx';
    const htmlOutputDirectory = 'public/assets/html';

    const docxFiles = fs.readdirSync(docxDirectory);

    if (!fs.existsSync(htmlOutputDirectory)) {
      fs.mkdirSync(htmlOutputDirectory);
    }

    const convertedFiles = [];

    for (const docxFile of docxFiles) {
      if (docxFile.endsWith('.docx')) {
        const docxPath = path.join(docxDirectory, docxFile);
        const htmlContent = await convertDocxToHtmlWithouchImage(docxPath);

        const htmlFileName = `${docxFile.replace('.docx', '.html')}`;
        const outputPath = path.join(htmlOutputDirectory, htmlFileName);
        fs.writeFileSync(outputPath, htmlContent);

        NextResponse.json('Converting...');
        convertedFiles.push({ docx: docxFile, html: htmlFileName });
      }
    }
    return NextResponse.json({
      message: 'Conversion Complete',
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
