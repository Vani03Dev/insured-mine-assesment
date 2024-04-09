import { Injectable } from '@nestjs/common';
import { Worker } from 'worker_threads';
import { FileWorkerService } from '../workers/file.worker';

@Injectable()
export class FileProcessorService {
  constructor() {}

  async parseCsv(file: Express.Multer.File): Promise<any> {
    const worker = new Worker(
      `${process.cwd()}/src/core/shared/workers/file.worker.ts`,
      {
        workerData: { filePath: file.path },
      },
    );

    worker.on('message', (data) => data.data);
    worker.on('error', (err) => {
      console.error('Error ::', err);
      return err;
    });
    worker.on('exit', (code) => {
      if (code !== 0) console.error(`Worker stopped with exit code ${code}`);
    });
  }
}
