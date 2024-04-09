import { Category, Policy } from '@app/database/schemas';
import { User } from '@app/database/schemas/user.schema';
import { Injectable, Scope } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable({ scope: Scope.REQUEST })
export class PolicyService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Category.name) private categorySchema: Model<Category>,
  ) {}

  public async getUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();

    console.log('Users ::', users);
    return users;
  }

  public async getPolicyByUsername(userName: string): Promise<any> {
    console.log('Executed policyByUsername');
    try {
      return await this.userModel
        .findOne({ userName: userName })
        .catch((err) => console.error('Find err ::', err));
    } catch (error) {
      console.error('==== Policy by username ::', error);
      return error.message;
    }
  }

  public async categories(): Promise<Category[]> {
    const categories = await this.categorySchema.find().exec();

    console.log('Categories ::', categories);

    return categories;
  }
}
