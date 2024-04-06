import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'userAccounts' })
export class UserAccount {
  @Prop({ required: true, type: String })
  name: string;
}

export const UserAccountSchema = SchemaFactory.createForClass(UserAccount);
