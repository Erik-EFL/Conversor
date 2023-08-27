import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises'
import { join } from 'path';
import { directory } from '@/core/provider/pathProvider';

export async function GET(request: NextRequest) {
  const header = request.headers.get('x-invoke-query');

  if (!header) return NextResponse.json('arquivo não encontrado ou inexistente')

  const decodedString = decodeURIComponent(header);

  const parsedObject = JSON.parse(decodedString);

  const fileName = parsedObject.filename;


  if (typeof fileName !== 'string') {
    return NextResponse.json('Invalid file name', { status: 400});
  }

  const filePath = join(process.cwd(), directory.HtmlPath, fileName);

  try {
    const fileBuffer = await fs.readFile(filePath);
    NextResponse.json('Dowload concluido', { status: 200 })
    return new Response(fileBuffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json(`Error downloading file: ${error.message}`, { status: 500});
  }
}
