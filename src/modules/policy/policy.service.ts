import { User } from '@app/database/schemas/user.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PolicyService {
  constructor(@InjectModel('User') private userSchema: Model<User>) {}

  async getUsers(): Promise<User[]> {
    return this.userSchema.find().exec();
  }
}
