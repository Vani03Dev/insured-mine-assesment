import { Injectable } from '@nestjs/common';
import csvParser from 'csv-parser';
import { Worker, isMainThread, parentPort } from 'worker_threads';
import fs from 'fs';

@Injectable()
export class FileProcessorService {
  constructor() {}

  async parseCsv(filePath: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      if (isMainThread) {
        const path = process.cwd() + `/${filePath}`;
        const thread = new Worker(path, {
          workerData: { filePath: path },
        });

        thread.on('message', (data) => resolve(data));
        thread.on('error', (err) => reject(err));
        thread.on('exit', (code) => {
          console.log('COde ::', code);
          if (code !== 0)
            reject(new Error(`Worker stopped with exit code ${code}`));
        });
        // thread.postMessage(filePath);
      } else {
        parentPort.on('message', async (filePath: string) => {
          const data: any[] = [];
          fs.createReadStream(filePath)
            .pipe(csvParser({ headers: true }))
            .on('data', (row) => data.push(row))
            .on('end', () => parentPort.postMessage(data))
            .on('error', (err) => reject(err));
        });
      }
    });
  }
}
