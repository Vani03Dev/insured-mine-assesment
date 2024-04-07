import {
  RestPostUpload,
  RestController,
  RestGet,
} from '@app/core/common/decorators';
import { UploadedFile } from '@nestjs/common';
import { PolicyService } from './policy.service';
import { FileProcessorService } from '@app/core/shared/services/file-processor.service';
import fs from 'fs';
@RestController({ tag: 'Policy', path: 'policy' })
export class PolicyController {
  constructor(
    private readonly policyService: PolicyService,
    private readonly fileProcessorService: FileProcessorService,
  ) {}

  @RestPostUpload({ path: '/upload' })
  public async upload(@UploadedFile() file: any): Promise<void> {
    await this.fileProcessorService.parseCsv(file.path);
  }

  @RestGet({ path: '/' })
  public async users(): Promise<any> {
    return this.policyService.getUsers();
  }
}
