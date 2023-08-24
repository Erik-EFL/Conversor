import beautify from "js-beautify";
import mammoth from 'mammoth';
import defaultStyleMap from "./styleMap";

const convertDocxToHtmlWithouchImage = async (docxPath: string): Promise<string> => {
  const options = {
    styleMap: defaultStyleMap
  };

  const result = await mammoth.convertToHtml({path: docxPath }, options);
  const formattedHtml = beautify.html(result.value, { indent_size: 2 });

  const htmlWithEmptyImages = formattedHtml.replace(/<img\b[^>]*alt="[^"]*"[^>]*>/gi, (match) => {
    return '<img src="" alt="">';
  });

  return htmlWithEmptyImages;
};

export {
  convertDocxToHtmlWithouchImage
};
