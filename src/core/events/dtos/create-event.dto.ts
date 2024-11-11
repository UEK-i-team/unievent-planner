import { IsDateString, IsString, IsNotEmpty, IsArray } from 'class-validator';
import { Expose } from 'class-transformer';
import { type EventType } from 'src/libs';

export class CreateEventDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  title!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  description!: string;

  @Expose()
  @IsNotEmpty()
  @IsDateString()
  startDate!: Date;

  @Expose()
  @IsNotEmpty()
  @IsDateString()
  endDate!: Date;

  @Expose()
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  groups!: string[];

  @Expose()
  @IsNotEmpty()
  @IsString()
  type!: EventType;
}
