import { HttpStatus, HttpException } from '@nestjs/common';
import { CommonError } from './common.errors';

export class GenericError {
  /** Internal code */
  errorType: string;

  /** User friendly message */
  errorMessage: string;

  /** Default is Internal Server Error */
  httpStatus?: HttpStatus;

  /** Error code to be displayed to the user */
  supportCode?: string;
}

// tslint:disable-next-line: max-classes-per-file
export class GenericException extends HttpException {
  public originalError: any;

  public errorDetails: object;

  constructor(
    error: GenericError & { errorDetails?: object },
    originalError?: any,
  ) {
    if (originalError && originalError.code === 'ECONNABORTED') {
      throw new GenericException(CommonError.GATEWAY_TIMEOUT);
    }

    const errorCode = error.httpStatus || HttpStatus.INTERNAL_SERVER_ERROR;

    super(
      HttpException.createBody({
        error: error.errorType,
        message: error.errorMessage,
        supportCode: error.supportCode,
      }),
      errorCode,
    );

    this.errorDetails = error.errorDetails;
    this.originalError = originalError;
  }
}
