import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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

  @Prop({ required: true, type: Number })
  userId: number;

  @Prop({ required: true, type: Number })
  categoryId: number;

  @Prop({ required: true, type: Number })
  companyId: number;

  @Prop({ required: true, type: Boolean })
  status: Boolean;
}

export const PolicySchema = SchemaFactory.createForClass(Policy);
