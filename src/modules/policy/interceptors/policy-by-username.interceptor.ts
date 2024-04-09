import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@app/database/schemas';
import { Model } from 'mongoose';
import { ApiException } from '@app/core/exceptions/api.exception';

export class PolicyByUserNameInterceptor implements NestInterceptor {
  constructor(@InjectModel('User') private userSchema: Model<User>) {}

  public async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();

    const { username } = request.query;

    try {
      const policy = await this.userSchema
        .findOne({ userName: username })
        .exec()
        .catch((err) => console.error('===== error ::', err));

      if (!policy) throw new ApiException('Policy not found!');
      request.policy = policy;
    } catch (error) {
      console.log('ERROR ::', error);
      throw error;
    }
    return handler.handle();
  }
}
