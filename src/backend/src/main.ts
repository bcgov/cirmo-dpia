import { Logger } from '@nestjs/common';
import 'dotenv/config';

import { createNestApp } from './app.config';

async function bootstrap() {
  // Initialize the Express based Nest application
  const { app } = await createNestApp();
  await app.init();

  // App listen to a port
  await app.listen(process.env.API_PORT, () => {
    Logger.log(
      `${process.env.API_NAME} is live on ${process.env.API_ENV} and serving traffic on port ${process.env.API_PORT}`,
    );
  });
}
bootstrap();
