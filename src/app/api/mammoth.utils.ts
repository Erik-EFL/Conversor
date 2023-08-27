import cheerio from 'cheerio';
import mammoth from 'mammoth';
import defaultStyleMap from './utils/styleMap';
import beautify from 'js-beautify';

enum ContentFormat {
  WithMetaAndImages = 'withMetaAndImages',
  WithoutMetaAndImages = 'withoutMetaAndImages',
}

const convertDocxToHtmlWithouchImage = async (
  docxPath: string,
): Promise<string> => {
  const options = {
    styleMap: defaultStyleMap,
  };

  const result = await mammoth.convertToHtml({ path: docxPath }, options);

  const $ = cheerio.load(result.value);

  // Remove <meta>
  $('meta').remove();

  $('figure').each((index, figureElement) => {
    const $figure = $(figureElement);
    const $imgTags = $figure.find('img');

    if ($imgTags.length > 1) {
      // Remove all but the first <img> tag
      $imgTags.slice(1).remove();
    } else if ($imgTags.length === 1) {
      // If there's only one <img> tag, remove the alt attribute and set src to empty
      $imgTags.attr('alt', '');
      $imgTags.attr('src', '');
    }
  });

  const updatedHtml = $.html();

  // Use js-beautify to format the HTML
  const formattedHtml = beautify.html(updatedHtml, { indent_size: 2 });

  // Remove <html>, <head>, and <body> tags
  const bodyStart = formattedHtml.indexOf('<body>');
  const bodyEnd = formattedHtml.lastIndexOf('</body>');
  const bodyContent = formattedHtml.substring(bodyStart + 6, bodyEnd);

  return bodyContent;
};

const convertDocxToHtmlWithImage = async (
  docxPath: string,
): Promise<string> => {
  const options = {
    styleMap: defaultStyleMap,
  };

  const result = await mammoth.convertToHtml({ path: docxPath }, options);

  const $ = cheerio.load(result.value);

  const htmlWithMetaTag = `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <style>
        body {
          max-width: 900px;
          min-width: 340px
        }
        img {
          max-width: 100%;
          min-width: 340px;
        }
      </style>
      <body style="margin: 0 auto;">
        ${$.html()}
      </body>
    </html>`;

  // Use js-beautify to format the HTML
  const formattedHtml = beautify.html(htmlWithMetaTag, { indent_size: 2 });

  return formattedHtml;
};



export { convertDocxToHtmlWithouchImage, convertDocxToHtmlWithImage, ContentFormat };
