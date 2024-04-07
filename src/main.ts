import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Request, RequestMethod } from '@nestjs/common';
import { configureSwaggerConfig } from '@app/config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.setGlobalPrefix('api/v1', {
    exclude: [{ path: '/', method: RequestMethod.ALL }],
  });

  // swagger setup
  configureSwaggerConfig(app);
  await app.listen(process.env.SERVER_PORT || '3001');
}
bootstrap().then(() => {});
