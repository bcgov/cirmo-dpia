import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

// Decorator to extract the access token from the HTTP request
export const TokenDecorator = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request?.headers?.authorization?.replace('Bearer ', '');
  },
);
