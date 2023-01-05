import * as pug from 'pug';
import * as Puppeteer from 'puppeteer';
import { pugToPdfBuffer } from 'src/common/helpers/pdf-helper';
/**
 * @Description
 * This file tests the contents of common/helpers/pdf-helper.ts
 */
describe('PdfHelper', () => {
  const pugCompileFileSpy = jest
    .spyOn(pug, 'compileFile')
    .mockImplementation(() => jest.fn());
  const pageMock = {
    setContent: jest.fn(),
    pdf: jest.fn(),
    close: jest.fn(),
  };
  const browserMock: any = {
    newPage: jest.fn().mockResolvedValue(pageMock),
    close: jest.fn(),
  };
  const puppeteerLaunchSpy = jest
    .spyOn(Puppeteer, 'launch')
    .mockResolvedValue(browserMock);
  beforeEach(() => {
    pugCompileFileSpy.mockClear();
    puppeteerLaunchSpy.mockClear();
  });

  /**
   * @method pugToPdfBuffer
   *
   * @input test values to the method
   * @output test buffer returned from the jest spy
   *
   * @description
   * This test suite validates that the method does not throw error and returns the expected buffer from the mock implementation
   */
  describe('`pugToPdfBuffer` method', () => {
    it('succeeds with correct mocks', async () => {
      const mockPdfBuffer: Buffer = Buffer.from('Test Buffer');
      pageMock.pdf.mockResolvedValue(mockPdfBuffer);
      const result = await pugToPdfBuffer('./temp-file.pug', {});
      expect(result).toBe(mockPdfBuffer);
    });
  });
});
