import { Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BasicClass } from './basic.model';

export abstract class BaseClass extends BasicClass {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserAccount',
    readonly: true,
    // select: false,
  })
  createdBy?: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserAccount',
  })
  updatedBy!: string;
}
