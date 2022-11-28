import * as pug from 'pug';
import * as Puppeteer from 'puppeteer';

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
