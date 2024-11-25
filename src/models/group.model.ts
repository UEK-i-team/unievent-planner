import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose from 'mongoose';
import { FieldConstraints, VerificationStatus } from '../libs';
import { BaseClass } from './base.model';

@Schema()
export class Group extends BaseClass {
  @Prop({
    required: true,
    trim: true,
    maxlength: FieldConstraints.NAME.MAX_LENGTH,
  })
  name!: string;

  @Prop({ required: true })
  avatarUrl!: string;

  @Prop({ required: false, trim: true })
  courseName?: string;

  @Prop({
    required: false,
    trim: true,
    maxlength: FieldConstraints.DESCRIPTION.MAX_LENGTH,
  }) // Optional description
  description?: string;

  @Prop({
    default: VerificationStatus.PENDING,
    required: true,
    enum: VerificationStatus,
  })
  verificationStatus!: VerificationStatus;

  @Prop({ required: false, trim: true })
  rejectionReason?: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserAccount',
  })
  president!: string;

  @Prop({
    required: true,
    default: [],
    type: [mongoose.Schema.Types.ObjectId],
    select: false,
    ref: 'JoinCode',
  })
  joinCodes!: mongoose.Types.ObjectId[];

  @Prop({
    required: true,
    default: [],
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'UserAccount',
    select: false,
  })
  members!: mongoose.Types.ObjectId[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
