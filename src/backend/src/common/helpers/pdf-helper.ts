import * as pug from 'pug';
import * as Puppeteer from 'puppeteer';

/**
 * @ethod pugToPdfBuffer
 *
 * @param templatePath | @type string | @required | path of the pug template file
 * @param data | @type json | @required | key-value pair to be fed into the pug template
 * @returns pdf buffer data
 *
 * @description
 * This method takes the pug template and the associated data and converts it to the pdf buffer
 */
export const pugToPdfBuffer = async (
  templatePath: string,
  data: Record<string, any>,
): Promise<Buffer> => {
  // Get base result pug template
  const compiledResultTemplateFunction = pug.compileFile(templatePath);

  // Compile the pug template with the custom values
  const html = compiledResultTemplateFunction(data);

  // open headless browser and create page
  const browser = await Puppeteer.launch({
    headless: true,
    args: ['--disable-dev-shm-usage', '--no-sandbox'],
  });

  // create new page
  const page = await browser.newPage();

  // Update content to custom content
  await page.setContent(html);

  // convert page to pdf buffer
  const pdfBuffer: Buffer = await page.pdf();

  // cleanups
  await page.close();
  await browser.close();

  // return the pdf buffer
  return pdfBuffer;
};
