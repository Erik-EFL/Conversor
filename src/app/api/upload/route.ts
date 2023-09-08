import { directory } from "@/core/provider/pathProvider";
import { writeFile, mkdir, unlink } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import { checkFileExists, logger, readDirectory, sanitizeData } from "../utils/functions.utils";
import { StatusCodes } from "http-status-codes";

export async function GET() {
  try {
    const files = await readDirectory(directory.DocxPath);

    const data = sanitizeData(files)

    return NextResponse.json({ success: true, data });
  } catch (error) {
    logger.error(error);
    return NextResponse.json({ success: false, error: "Failed to retrieve files" }, { status: StatusCodes.OK });
  }
}

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const files: File[] | null = data.getAll('file') as unknown as File[];

  if (!files || files.length === 0) {
    return NextResponse.json({ success: false });
  }

  await mkdir(directory.DocxPath, { recursive: true });

  const uploadedFiles = [];

  const allowedFileTypes = ['docx'];

  for (const file of files) {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (!fileExtension || !allowedFileTypes.includes(fileExtension)) {
      return NextResponse.json({ success: false, message: 'Invalid file type' });
    }

    try {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const filePath = join(directory.DocxPath, file.name);
      await writeFile(filePath, buffer)
    } catch (error) {
      logger.error(`Error uploading file ${file.name}:`, error);
      return NextResponse.json({ success: false, error }, { status: StatusCodes.BAD_REQUEST });
    }

    uploadedFiles.push(file.name);
  }

  return new NextResponse(
    JSON.stringify({
      message: 'Uploaded Complete',
      uploadedFiles,
    }),
    { status: StatusCodes.OK, headers: { 'Content-Type': 'application/json' } }
  );
}

export const DELETE = async (request: NextRequest) => {
  try {
    const header = request.headers.get('x-invoke-query');

    if (!header) return NextResponse.json('Arquivo não encontrado ou inexistente', { status: StatusCodes.NOT_FOUND })

    const decodedString = decodeURIComponent(header);

    const parsedObject = JSON.parse(decodedString);

    const fileName = parsedObject.filename;

    if (!fileName) {
      return NextResponse.json({ success: false, message: 'Filename not provided' });
    }

    const filePath = join(directory.DocxPath, fileName);

    const fileExists = await checkFileExists(filePath);

    if (fileExists) {
      try {
        await unlink(filePath);
        return NextResponse.json({ success: true, message: 'Arquivo Deletado com Sucesso' }, { status: StatusCodes.OK });
      } catch (error) {
        logger.error('Error deleting file:', error);
        return NextResponse.json({ message: 'Error deleting file' }, { status: StatusCodes.BAD_REQUEST });
      }
    }

    return NextResponse.json({ success: true, message: 'Arquivo Deletado com Sucesso' }, { status: StatusCodes.OK });
  } catch (error) {
    logger.error('Error deleting file:', error);
    return NextResponse.json({ message: 'Error deleting file' }, { status: StatusCodes.BAD_REQUEST });
  }
}
