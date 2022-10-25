import { HttpStatus } from '@nestjs/common';
import { GenericError } from 'src/common/generic-exception';

export const AuthError = {
  INVALID_CREDENTIAL: {
    errorType: 'INVALID_CREDENTIAL',
    errorMessage: 'Incorrect username or password',
    httpStatus: HttpStatus.UNAUTHORIZED,
  } as GenericError,

  BROKEN_RECORD: {
    errorType: 'BROKEN_RECORD',
    errorMessage: 'Account is not properly registered in this environment',
    httpStatus: HttpStatus.FORBIDDEN,
  } as GenericError,

  EXPIRED_PASSWORD: {
    errorType: 'EXPIRED_PASSWORD',
    errorMessage:
      'Users password has expired. An email has been sent to unlock your account',
    httpStatus: HttpStatus.FORBIDDEN,
  } as GenericError,

  INVALID_SESSION: {
    errorType: 'INVALID_SESSION',
    errorMessage: 'Invalid session',
    httpStatus: HttpStatus.UNAUTHORIZED,
  } as GenericError,

  INVALID_SESSION_TOKEN: {
    errorType: 'INVALID_SESSION_TOKEN',
    errorMessage: 'Invalid session token',
    httpStatus: HttpStatus.UNAUTHORIZED,
  } as GenericError,

  UNAUTHORIZED: {
    errorType: 'UNAUTHORIZED',
    errorMessage: 'Not Authorized',
    httpStatus: HttpStatus.UNAUTHORIZED,
  } as GenericError,

  FORBIDDEN_ACTION: {
    errorType: 'FORBIDDEN_ACTION',
    errorMessage: 'You are not authorized to perform this action',
    httpStatus: HttpStatus.FORBIDDEN,
  } as GenericError,

  INVALID_SESSION_LEVEL: {
    errorType: 'INVALID_SESSION_LEVEL',
    errorMessage: 'Invalid session level',
    httpStatus: HttpStatus.FORBIDDEN,
  } as GenericError,

  UNVERIFIED_EMAIL: {
    errorType: 'UNVERIFIED_EMAIL',
    errorMessage: 'You need to verify your email address',
    httpStatus: HttpStatus.UNAUTHORIZED,
  } as GenericError,

  INACTIVE_ACCOUNT: {
    errorType: 'INACTIVE_ACCOUNT',
    errorMessage: 'User account is not active',
    httpStatus: HttpStatus.FORBIDDEN,
  } as GenericError,

  INCOMPLETE_REGISTRATION: {
    errorType: 'INCOMPLETE_REGISTRATION',
    errorMessage: 'User has not completed their registration',
    httpStatus: HttpStatus.FORBIDDEN,
  } as GenericError,

  INVALID_ACCESS_CODE: {
    errorType: 'INVALID_ACCESS_CODE',
    errorMessage: 'Invalid access code',
    httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
  } as GenericError,

  INVALID_PASSWORD: {
    errorType: 'INVALID_PASSWORD',
    errorMessage: 'Password is invalid',
    httpStatus: HttpStatus.UNAUTHORIZED,
  } as GenericError,
};
