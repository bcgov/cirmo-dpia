import { HttpRequest } from './http-request.util';

export enum FileDownloadTypeEnum {
  PDF = 'pdf',
}

export class FileDownload {
  public static async download(
    endpoint: string,
    contentType: FileDownloadTypeEnum,
    additionalConfig = {},
  ) {
    const response = await HttpRequest.get<Response>(
      endpoint,
      { 'Content-Type': `application/${contentType}` },
      additionalConfig,
      true,
    );
    const blob: Blob = await response.blob();

    // Create blob link to download
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `result.pdf`);

    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode?.removeChild(link);
  }
}
