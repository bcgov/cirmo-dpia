import { HttpStatus } from '@nestjs/common';
import { GenericError } from 'src/common/generic-exception';

export const CommonError = {
  INTERNAL_ERROR: {
    errorType: 'INTERNAL_ERROR',
    errorMessage: 'Internal Server Error',
    httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
  } as GenericError,

  INVALID_QUERY_PARAMETER: {
    errorType: 'INVALID_QUERY_PARAMETER',
    errorMessage: 'Failed while processing query.',
    httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
  } as GenericError,

  FAILED_FIELD_VALIDATION: {
    errorType: 'FAILED_FIELD_VALIDATION',
    errorMessage:
      'Some fields were rejected. Please, check the provided information and try again.',
    httpStatus: HttpStatus.PRECONDITION_FAILED,
  } as GenericError,

  UNSUPPORTED_MEDIA_TYPE: {
    errorType: 'UNSUPPORTED_MEDIA_TYPE',
    errorMessage: 'Unsupported file type.',
    httpStatus: HttpStatus.UNSUPPORTED_MEDIA_TYPE,
  } as GenericError,

  HIGHER_PERMISSION_REQUIRED: {
    errorType: 'HIGHER_PERMISSION_REQUIRED',
    errorMessage: `This action requires higher level of access.`,
    httpStatus: HttpStatus.FORBIDDEN,
  } as GenericError,

  PERMISSION_DENIED: {
    errorType: 'PERMISSION_DENIED',
    errorMessage: `You don't have permission to perform this action.`,
    httpStatus: HttpStatus.FORBIDDEN,
  } as GenericError,

  GATEWAY_TIMEOUT: {
    errorType: 'GATEWAY_TIMEOUT',
    errorMessage: 'Gateway Timeout',
    httpStatus: HttpStatus.GATEWAY_TIMEOUT,
  } as GenericError,
};
