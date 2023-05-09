import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { IRequest } from 'src/common/interfaces/request.interface';
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
  /* This function adds uuid to the morgan log */
  morgan.token('uuid', function getId(req: IRequest) {
    return 'uuid: ' + req?.user?.idir_user_guid;
  });

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
          process.env.API_ENV === 'local'
            ? ['error', 'warn', 'log', 'verbose', 'debug']
            : ['log', 'warn', 'error'],
      },
    );

  // append request logs
  /*
   * Enhancing the default morgan log to include uuid
   * app.use(morgan('default'));
   */
  app.use(
    morgan(
      ':uuid :remote-addr - :remote-user [:date] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
    ),
  );

  // Transform types during DTO Validation
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Assign global prefix to all endpoints
  app.setGlobalPrefix('/api');

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });
  app.enableCors({
    origin: ['http://localhost:3000'],
  });
  // Enable Swagger
  SwaggerDocs(app);

  return {
    app,
    expressApp,
  };
}
