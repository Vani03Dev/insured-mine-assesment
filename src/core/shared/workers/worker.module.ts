import { Module } from '@nestjs/common';
import { FileWorkerService } from './file.worker';

@Module({
  exports: [FileWorkerService],
})
export class WorkerModule {}
