import { Expose } from 'class-transformer';
import { EventTypeDto } from './eventType.dto';

export class CreateEventDto {
  @Expose()
  title!: string;

  @Expose()
  description!: string;

  @Expose()
  groups!: string[];

  @Expose()
  status!: string;

  @Expose()
  typeModel!: EventTypeDto;

  @Expose()
  startDate!: Date;

  @Expose()
  endDate!: Date;
}
