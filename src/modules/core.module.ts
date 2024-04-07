import { Module } from '@nestjs/common';
import { PolicyModule } from '@app/modules/policy/policy.module';

@Module({
  imports: [...[PolicyModule]],
})
export class CoreModule {}
