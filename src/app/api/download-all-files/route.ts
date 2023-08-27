import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import { join, extname } from 'path';
import { directory } from '@/core/provider/pathProvider';
import archiver from 'archiver';

export async function GET(request: NextRequest) {
  const targetFolder = join(process.cwd(), directory.HtmlPath);

  try {
    const files = await fs.promises.readdir(targetFolder);

    if (files.length === 0) {
      return new NextResponse(JSON.stringify({ message: 'No files to download' }), {
        status: 404,
      });
    }

    const zipFileName = 'downloaded-files.zip';
    const zipFilePath = join(process.cwd(), directory.HtmlPath, zipFileName);

    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver('zip', {
      zlib: { level: 9 },
    });

    archive.pipe(output);

    for (const fileName of files) {
      // Check if the file is not a .zip file or a .gitkeep file
      if (extname(fileName) !== '.zip' && fileName !== '.gitkeep') {
        const filePath = join(targetFolder, fileName);
        archive.append(await fs.promises.readFile(filePath), { name: fileName });
      }
    }

    // Finalize the archive and wait for the stream to finish
    await archive.finalize();
    await new Promise<void>((resolve) => {
      output.on('close', resolve);
    });

    // Read the generated zip file and return it as a response
    const zipFileBuffer = await fs.promises.readFile(zipFilePath);

    return new NextResponse(zipFileBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${zipFileName}"`,
      },
    });
  } catch (error: any) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: `Error downloading files: ${error.message}` }), {
      status: 500,
    });
  }
}