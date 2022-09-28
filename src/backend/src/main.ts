import 'dotenv/config';

import { createNestApp } from './app.config';

async function bootstrap() {

  // Initialize the Express based Nest application
  const { app } = await createNestApp();
  await app.init();

   // Starts listening for shutdown hooks
  app.enableShutdownHooks();
  // App listen to a port
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
