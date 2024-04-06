import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'agents' })
export class Agent {
  @Prop({ required: true, type: String })
  name: string;
}

export const AgentSchema = SchemaFactory.createForClass(Agent);
