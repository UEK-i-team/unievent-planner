import { Expose } from 'class-transformer';
import { BaseDto } from '../../../libs';
import { EventTypeDto } from './eventType.dto';

export class EventDto extends BaseDto {
  @Expose()
  title!: string;

  @Expose()
  description!: string;

  @Expose()
  startDate!: Date;

  @Expose()
  endDate!: Date;

  @Expose()
  groups!: string[];

  @Expose()
  typeModel!: EventTypeDto;
}
