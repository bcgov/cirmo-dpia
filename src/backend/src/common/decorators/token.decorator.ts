import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

// Decorator to get the access token from the
export const TokenDecorator = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    return request?.headers?.authorization?.replace('Bearer ', '');
  },
);
