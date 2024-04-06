import {
  RestPostUpload,
  RestController,
  RestGet,
} from '@app/core/common/decorators';
import { UploadedFile } from '@nestjs/common';
import { PolicyService } from './policy.service';

@RestController({ tag: 'Policy', path: 'policy' })
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @RestPostUpload({ path: '/upload' })
  public upload(@UploadedFile() file: any): void {
    console.log(file);
  }

  @RestGet({ path: '/' })
  public async users(): Promise<any> {
    return this.policyService.getUsers();
  }
}
