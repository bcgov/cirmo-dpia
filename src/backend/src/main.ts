import { Logger } from '@nestjs/common';
import 'dotenv/config';

import { createNestApp } from './app.config';

async function bootstrap() {
  // Initialize the Express based Nest application
  const { app } = await createNestApp();
  await app.init();
  app.enableCors();
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
  });
  // App listen to a port
  await app.listen(process.env.API_PORT, () => {
    Logger.log(
      `${process.env.API_NAME} is live on ${process.env.API_ENV} and serving traffic on port ${process.env.API_PORT}`,
    );
  });
}
bootstrap();
