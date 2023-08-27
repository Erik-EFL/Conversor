import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import { join } from 'path';
import { directory } from '@/core/provider/pathProvider';

export async function POST(request: NextRequest) {
  try {
    const targetFolder = directory.DocxPath;

    const files = await fs.readdir(targetFolder);

    for (const fileName of files) {
      // Verifique se o nome do arquivo não é .gitkeep antes de excluir
      if (fileName !== '.gitkeep') {
        const filePath = join(targetFolder, fileName);
        await fs.unlink(filePath);
      }
    }

    return new NextResponse(JSON.stringify({ message: 'All files deleted successfully' }), {
      status: 200,
    });
  } catch (error: any) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: `Error deleting files: ${error.message}` }), {
      status: 500,
    });
  }
}
