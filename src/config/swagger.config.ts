import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { toLower } from 'lodash';
import { PRODUCTION_MODE } from './base.config';

const EnvironmentIndicator: Record<string, string> = {
  local: '.swagger-ui .topbar { background-color: #22c55e; }',
  qa: '.swagger-ui .topbar { background-color: #eab308; }',
  development: '.swagger-ui .topbar { background-color: #3b82f6; }',
  production: '.swagger-ui .topbar { background-color: #dc2626; }',
};

export const configureSwaggerConfig = (app: NestExpressApplication): void => {
  const docs = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle(`Test API | API Documentation [${process.env.STAGE}]`)
      .setVersion('1.0.0')
      .addTag('Policy', 'Policy Endpoint')
      .addServer(process.env.SWAGGER_HOST, process.env.STAGE)
      .build(),
  );

  SwaggerModule.setup('/swagger', app, docs, {
    customSiteTitle: `${process.env.SERVER_NAME} | API Documentation`,
    customCss:
      EnvironmentIndicator[toLower(process.env.STAGE)] ??
      '.swagger-ui .topbar { background-color: black; }',
    swaggerOptions: {
      persistAuthorization: !PRODUCTION_MODE,
    },
  });
};
