import { Module } from '@nestjs/common';
import { MongodbProvider } from './mongodb.provider';

@Module({
  providers: [],
  exports: [DatabaseModule],
})
export class DatabaseModule {}
