import { Module } from '@nestjs/common';
import { PolicyService } from '@app/modules/policy/policy.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '@app/database/schemas';
import { PolicyController } from '@app/modules/policy/policy.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [PolicyController],
  providers: [PolicyService],
  exports: [PolicyModule],
})
export class PolicyModule {}
