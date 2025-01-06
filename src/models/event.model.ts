import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { EventType, FieldConstraints } from '../libs';
import { BaseClass } from './base.model';
import { EventTypeColor } from '../libs';

export type EventDocument = Event & Document;

export class EventTypeColorModel {
  @Prop({
    default: EventTypeColor.OTHER,
    required: true,
    enum: EventTypeColor,
  })
  color!: EventTypeColor;

  @Prop({
    default: EventType.OTHER,
    required: true,
    enum: EventType,
  })
  type!: EventType;
}

@Schema()
export class Event extends BaseClass {
  @Prop({
    required: true,
    trim: true,
    maxlength: FieldConstraints.TITLE.MAX_LENGTH,
  })
  title!: string;

  @Prop({
    required: true,
    trim: true,
    maxlength: FieldConstraints.DESCRIPTION.MAX_LENGTH,
  })
  description!: string;

  @Prop({ required: true })
  startDate!: Date;

  @Prop({ required: true })
  endDate!: Date;

  @Prop({
    required: true,
    default: [],
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Group',
    select: false,
  })
  groups!: mongoose.Types.ObjectId[];

  @Prop({ required: true, type: EventTypeColorModel })
  typeModel!: EventTypeColorModel;
}

export const EventSchema = SchemaFactory.createForClass(Event);
