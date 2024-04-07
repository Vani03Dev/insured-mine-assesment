import { Module } from '@nestjs/common';
import { PolicyService } from '@app/modules/policy/policy.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PolicySchema,
  UserSchema,
  CategorySchema,
  CompanySchema,
  AgentSchema,
  UserAccountSchema,
} from '@app/database/schemas';
import { PolicyController } from '@app/modules/policy/policy.controller';
import { FileProcessorService } from '@app/core/shared/services/file-processor.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'UserAccount', schema: UserAccountSchema },
      { name: 'Policy', schema: PolicySchema },
      { name: 'Category', schema: CategorySchema },
      { name: 'Company', schema: CompanySchema },
      { name: 'Agent', schema: AgentSchema },
    ]),
  ],
  controllers: [PolicyController],
  providers: [PolicyService, FileProcessorService],
  exports: [PolicyModule],
})
export class PolicyModule {}
