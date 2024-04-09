import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.schema';
import { Category } from './category.schema';
import { Company } from './company.schema';

@Schema({ collection: 'policies' })
export class Policy {
  @Prop({ required: true, type: String })
  policyNumber: string;

  @Prop({ required: true, type: Date })
  startDate: Date;

  @Prop({ required: true, type: Date })
  endDate: Date;

  @Prop({ required: true, type: String })
  premiumAmount: string;

  @Prop({ required: true, type: String })
  type: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: mongoose.Schema.Types.ObjectId | User;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  })
  categoryId: number;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  })
  companyId: number;

  @Prop({ required: true, type: Boolean })
  status: Boolean;
}

export const PolicySchema = SchemaFactory.createForClass(Policy);
