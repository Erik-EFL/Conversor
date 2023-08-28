import { directory } from "@/core/provider/pathProvider";
import { writeFile, mkdir, unlink, readdir } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function GET(request: NextRequest) {
  try {
    const targetFolder = join(process.cwd(), directory.DocxPath);
    const files = await readdir(targetFolder);

    const data = files.filter(item => item !== '.gitkeep')

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to retrieve files" });
  }
}

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const files: File[] | null = data.getAll('file') as unknown as File[];

  if (!files || files.length === 0) {
    return NextResponse.json({ success: false });
  }

  const targetFolder = join(process.cwd(), directory.DocxPath);

  await mkdir(targetFolder, { recursive: true });

  const uploadedFiles = [];

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filePath = join(targetFolder, file.name);
    await writeFile(filePath, buffer);

    uploadedFiles.push(file.name);
  }

  return new NextResponse(
    JSON.stringify({
      message: 'Uploaded Complete',
      uploadedFiles,
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
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

    const targetFolder = join(process.cwd(), directory.DocxPath);
    const filePath = join(targetFolder, fileName);

    await unlink(filePath);

    return NextResponse.json({ success: true, message: 'Arquivo Deletado com Sucesso' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json({ message: 'Error deleting file' }, { status: 400 });
  }
}
