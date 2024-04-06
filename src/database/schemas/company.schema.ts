import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'companies' })
export class Company {
  @Prop({ required: true, type: String })
  name: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
