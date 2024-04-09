import { Gender, Roles } from '@app/core/common/common.types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';
import { Policy } from './policy.schema';

@Schema({ collection: 'users' })
export class User {
  @Prop({ required: true, type: String })
  public firstName: string;

  @Prop({ required: true, type: String })
  lastName: string;

  @Prop({ required: true, type: Date })
  dob: Date;

  @Prop({ required: true, type: String })
  address: string;

  @Prop({ required: true, type: String })
  phoneNumber: string;

  @Prop({ required: true, type: String })
  state: string;

  @Prop({ required: true, type: String, minlength: 5, maxlength: 8 })
  zipCode: string;

  @Prop({ required: true, type: String })
  email: string;

  @Prop({ required: true, enum: Gender })
  gender: Gender;

  @Prop({ required: true, enum: Roles })
  userType: Roles;

  // Relationship
  @Prop([{ type: Types.ObjectId, ref: 'Policy' }])
  policies: Types.ObjectId[] | Policy[];

  // userName: string;

  // getuserName(): string {
  //   console.log('fistName ::', this.firstName);
  //   return `${this.firstName} ${this.lastName}`;
  // }
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.virtual('userName').get(function (this: User) {
  return `${this.firstName} ${this.lastName}`;
});
