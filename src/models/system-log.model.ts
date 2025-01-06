import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseClass } from './base.model';
import { Context, SystemLogAction } from 'src/libs';

@Schema()
export class SystemLog extends BaseClass {
  @Prop({ required: true, enum: SystemLogAction })
  action!: SystemLogAction; // typ akcji (np. 'create', 'delete', 'update') enum

  @Prop({ required: true, type: String })
  message!: string; // szczegóły akcji, np. co zostało dodane/usunięte

  @Prop({ required: true, enum: Context })
  context!: Context; // enum event, announcement, group, joincodes, roles
}

export const SystemLogSchema = SchemaFactory.createForClass(SystemLog);
