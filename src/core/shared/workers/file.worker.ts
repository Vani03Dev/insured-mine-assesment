// csv-worker.service.ts
import { Injectable } from '@nestjs/common';
import { parentPort } from 'worker_threads';
import * as fs from 'fs';
import * as csvParser from 'csv-parser';

@Injectable()
export class FileWorkerService {
  async processCsv(filePath: string): Promise<void> {
    try {
      const rows = await this.readFile(filePath);
      console.log('Executed ===');
      const headers = rows[0];

      const agents = [...new Set(rows.map((res) => res.agent))];
      console.log('Agents:', agents);

      parentPort?.postMessage({ success: true, data: rows });
    } catch (error) {
      parentPort?.postMessage({ success: false, error: error.message });
    }
  }

  private readFile(filePath: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const rows = [];
      fs.createReadStream(filePath)
        .pipe(csvParser({ headers: true }))
        .on('data', (row) => rows.push(this.transformData(row)))
        .on('end', () => resolve(rows))
        .on('error', (err) => reject(err));
    });
  }

  private transformData(data): any {
    return {
      agent: data._0 || '',
      userType: data._1 || '',
      policy_mode: data._2 || '',
      producer: data._3 || '',
      policy_number: data._4 || '',
      premium_amount_written: data._5 || '',
      premium_amount: data._6 || '',
      policy_type: data._7 || '',
      company_name: data._8 || '',
      category_name: data._9 || '',
      policy_start_date: data._10 || '',
      policy_end_date: data._11 || '',
      csr: data._12 || '',
      account_name: data._13 || '',
      email: data._14 || '',
      gender: data._15 || '',
      firstname: data._16 || '',
      city: data._17 || '',
      account_type: data._18 || '',
      phone: data._19 || '',
      address: data._20 || '',
      state: data._21 || '',
      zip: data._22 || '',
      dob: data._23 || '',
    };
  }
}
