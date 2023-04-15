import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from 'src/app.module';
import { HealthModule } from 'src/health/health.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { CommentsModule } from 'src/modules/comments/comments.module';
import { ConfigurationModule } from 'src/modules/configuration/configuration.module';
import { GCNotifyModule } from 'src/modules/gcnotify/gcnotify.module';
import { PiaIntakeModule } from 'src/modules/pia-intake/pia-intake.module';
import { PpqModule } from 'src/modules/ppq/ppq.module';

export const SwaggerDocs = (app: INestApplication) => {
  const { API_NAME } = process.env;
  const { API_VERSION } = process.env;

  const options = new DocumentBuilder()
    .setTitle(API_NAME)
    .setVersion(API_VERSION)
    .setDescription(
      `## OpenAPI Specifiation for the following:
        \n - available endpoints, endpoint operations and operation parameters (input and output)
        \n - authentication methods to utilize this API
        \n - contact information, license, terms of use and other information regarding the consumption of this API`,
    )
    .addBearerAuth()
    .build();

  const baseDocument = SwaggerModule.createDocument(app, options, {
    include: [
      AppModule,
      HealthModule,
      PpqModule,
      AuthModule,
      ConfigurationModule,
      PiaIntakeModule,
      GCNotifyModule,
      CommentsModule,
    ],
  });

  const uiOptions = {
    customSiteTitle: API_NAME,
    customCss: `
      .topbar-wrapper img {content:url(https://www2.gov.bc.ca/StaticWebResources/static/gov3/images/gov_bc_logo.svg); width:190px; height:auto;}
      .swagger-ui .topbar { background-color: #234075; border-bottom: 2px solid #e3a82b; }`,
    swaggerOptions: {
      docExpansion: 'none',
      displayRequestDuration: true,
      operationsSorter: 'alpha',
      tagsSorter: 'alpha',
      defaultModelsExpandDepth: -1,
      defaultModelExpandDepth: 2,
    },
  };

  SwaggerModule.setup('api/api-docs', app, baseDocument, uiOptions);
};
