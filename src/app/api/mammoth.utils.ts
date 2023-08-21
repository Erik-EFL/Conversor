import beautify from "js-beautify";
import mammoth from 'mammoth';
import defaultStyleMap from "./styleMap";

const convertDocxToHtml = async (docxPath: string): Promise<string> => {
  const options = {
    styleMap: defaultStyleMap
  };

  const result = await mammoth.convertToHtml({path: docxPath }, options);
  const formattedHtml = beautify.html(result.value, { indent_size: 2 });

  const htmlWithoutImages = formattedHtml.replace(/<img\b[^>]*>/gi, "");

  return htmlWithoutImages;

  // return formattedHtml;
};

export default convertDocxToHtml;
