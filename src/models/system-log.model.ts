import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseClass } from './base.model';

@Schema()
export class SystemLog extends BaseClass {
  @Prop({ required: true, type: String })
  action!: string; // typ akcji (np. 'create', 'delete', 'update') enum

  @Prop({ required: true, type: String })
  message!: string; // szczegóły akcji, np. co zostało dodane/usunięte

  @Prop({ required: true, type: String })
  context!: string; // enum event, announcement, group, joincodes, roles
}

export const SystemLogSchema = SchemaFactory.createForClass(SystemLog);
