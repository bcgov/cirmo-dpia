import * as pug from 'pug';
import * as Puppeteer from 'puppeteer';
import { pugToPdfBuffer } from 'src/common/helpers/pdf-helper';
/**
 * @Description
 * This file tests the contents of common/helpers/pdf-helper.ts
 */
describe('PdfHelper', () => {
  /**
   * @method pugToPdfBuffer
   *
   * @description
   * This test suite validates that the method does not throw error and returns the expected data
   */
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
  describe('`pugToPdfBuffer` method', () => {
    it('succeeds with correct mocks', async () => {
      const mockPdfBuffer: Buffer = Buffer.from('Test Buffer');
      pageMock.pdf.mockResolvedValue(mockPdfBuffer);
      const result = await pugToPdfBuffer('./temp-file.pug', {});
      expect(result).toBe(mockPdfBuffer);
    });
  });
});
