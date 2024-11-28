import { Optional } from '@nestjs/common';
import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsString,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';
import { FieldConstraints } from 'src/libs';

export class CreateAnnouncementDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @MaxLength(FieldConstraints.TITLE.MAX_LENGTH)
  title!: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @MaxLength(FieldConstraints.DESCRIPTION.MAX_LENGTH)
  description!: string;

  @Expose()
  @Optional()
  @IsDateString()
  expiresAt?: Date;

  @Expose()
  @IsNotEmpty()
  @IsBoolean()
  important!: boolean;
}
