import { directory } from '@/core/provider/pathProvider';
import fs from 'fs/promises';
import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';
import { join } from 'path';
import { checkDirectoryExists, readDirectory } from '../utils/functions.utils';

export async function POST() {
  try {
    await checkDirectoryExists(directory.DocxPath);

    const files = await readDirectory(directory.DocxPath);

    await Promise.all(files
      .filter(fileName => fileName !== '.gitkeep')
      .map(async fileName => {
        const filePath = join(directory.DocxPath, fileName);
        await fs.unlink(filePath);
      })
    );

    return NextResponse.json(({ message: 'All files deleted successfully' }), {
      status: StatusCodes.OK,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(({ message: `Error deleting files: ${error.message}` }), {
      status: StatusCodes.BAD_REQUEST,
    });
  }
}
