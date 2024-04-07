import { Gender, Roles } from '@app/core/common/common.types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'users' })
export class User {
  @Prop({ required: true, type: String })
  firstName: string;

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
}

export const UserSchema = SchemaFactory.createForClass(User);
