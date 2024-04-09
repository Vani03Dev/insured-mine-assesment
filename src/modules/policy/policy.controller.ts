import {
  RestPostUpload,
  RestController,
  RestGet,
} from '@app/core/common/decorators';
import { Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { PolicyService } from './policy.service';
import { FileProcessorService } from '@app/core/shared/services/file-processor.service';
import fs from 'fs';
import { PolicyByUserNameInterceptor } from './interceptors/policy-by-username.interceptor';
import { PolicyByUserNameDecorator } from './decorators/policy-by-username.decorator';
import { Category } from '@app/database/schemas';
@RestController({ tag: 'Policy', path: 'policy' })
export class PolicyController {
  constructor(
    private readonly policyService: PolicyService,
    private readonly fileProcessorService: FileProcessorService,
  ) {}

  @RestPostUpload({
    path: '/upload',
    summary: 'Allow to upload csv/excel file',
  })
  public async upload(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<void> {
    await this.fileProcessorService.parseCsv(file);
  }

  @UseInterceptors(PolicyByUserNameInterceptor)
  @RestGet({ path: '/', summary: 'Allow to pull policy by username' })
  public async policyByUserName(
    @Query('username') username: string,
    @PolicyByUserNameDecorator() policy: any,
  ): Promise<any> {
    return policy;
  }

  @RestGet({ path: '/categories', summary: 'Allow to get categories' })
  public async categories(): Promise<any> {
    return this.policyService.categories();
  }
}
