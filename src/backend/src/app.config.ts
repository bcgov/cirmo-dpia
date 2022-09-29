import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import * as express from 'express';
import * as morgan from 'morgan';
import { AppModule } from './app.module';
import { SwaggerDocs } from './common/swagger';

export async function createNestApp(): Promise<{
  app: NestExpressApplication;
  expressApp: express.Application;
}> {
  // Express App
  const expressApp = express();
  expressApp.disable('x-powered-by');

  // Nest Application with Express Adapter
  const app: NestExpressApplication =
    await NestFactory.create<NestExpressApplication>(
      AppModule,
      new ExpressAdapter(expressApp),
      {
        logger:
          process.env.NODE_ENV === 'development'
            ? ['error', 'warn', 'log', 'verbose', 'debug']
            : ['log', 'warn', 'error'],
      },
    );

  // append request logs
  app.use(morgan('tiny'));

  // Assign global prefix to all endpoints
  app.setGlobalPrefix('/api');

  // Enable Swagger
  SwaggerDocs(app);

  return {
    app,
    expressApp,
  };
}
