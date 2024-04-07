import { RestPostUpload, RestController } from '@app/core/common/decorators';

@RestController({ tag: 'Policy', path: 'policy' })
export class PolicyController {
  constructor() {}

  @RestPostUpload({ path: '/upload' })
  public upload(): void {}
}
