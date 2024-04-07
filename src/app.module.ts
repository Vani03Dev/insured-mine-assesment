import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PRODUCTION_MODE, baseConfig } from '@app/config/base.config';
import { CoreModule } from './modules/core.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [baseConfig],
      cache: PRODUCTION_MODE,
    }),
    MongooseModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        uri: process.env.MONGO_URI,
      }),
      inject: [ConfigService],
    }),
    CoreModule,
  ],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {}
}
