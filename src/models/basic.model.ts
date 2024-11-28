import { Prop } from '@nestjs/mongoose';
import { SystemStatus } from 'src/libs';

export abstract class BasicClass {
  @Prop({ required: true, default: SystemStatus.ACTIVE, enum: SystemStatus })
  status!: SystemStatus;

  @Prop({ required: true, default: Date.now, readonly: true })
  createdAt!: Date;

  @Prop({ required: true, default: Date.now })
  updatedAt!: Date;
}
