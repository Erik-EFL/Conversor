import beautify from "js-beautify";
import mammoth from 'mammoth';
import defaultStyleMap from "./styleMap";
import path from "path";
import fs from 'fs';
import unzipper from 'unzipper';

const extractImages = async (docxPath: string, destinationPath: string): Promise<void> => {
  try {
    const zip = await unzipper.Open.file(docxPath);
    const mediaFolder = 'word/media/';

    for (const entry of zip.files) {
      if (entry.type === 'File' && entry.path.startsWith(mediaFolder)) {
        const mediaFileName = path.basename(entry.path);
        const destinationFolderPath = path.join(destinationPath, 'medias');
        const destinationFilePath = path.join(destinationFolderPath, mediaFileName);

        if (!fs.existsSync(destinationFolderPath)) {
          fs.mkdirSync(destinationFolderPath, { recursive: true });
        }

        const content = await entry.buffer();
        fs.writeFileSync(destinationFilePath, content);
      }
    }

    console.log('Media files copied successfully.');
  } catch (error) {
    console.error('Error:', error);
  }
};

const convertDocxToHtmlWithouchImage = async (docxPath: string): Promise<string> => {
  const options = {
    styleMap: defaultStyleMap
  };

  const result = await mammoth.convertToHtml({ path: docxPath }, options);
  const formattedHtml = beautify.html(result.value, { indent_size: 2 });

  // Substituir apenas o valor do atributo src na tag img externa
  const htmlWithoutImages = formattedHtml.replace(/<img\b[^>]*src="[^"]*"[^>]*><\/img>/gi, (match) => {
    return match.replace(/src="[^"]*"/i, 'src=""');
  });

  const destinationFolderName = path.basename(docxPath, path.extname(docxPath));
  const destinationPath = path.join('assets', 'html', destinationFolderName);
  const htmlFilePath = path.join(destinationPath, 'index.html');

  fs.mkdirSync(destinationPath, { recursive: true });
  fs.writeFileSync(htmlFilePath, htmlWithoutImages);

  await extractImages(docxPath, destinationPath);

  return htmlWithoutImages;
};

export {
  convertDocxToHtmlWithouchImage
};
