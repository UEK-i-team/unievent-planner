import { Expose } from 'class-transformer';
import { BaseDto } from '../../../libs/shared/dtos';

export class SystemLogDto extends BaseDto {
  @Expose()
  action!: string;

  @Expose()
  message!: string;

  @Expose()
  context!: string;
}
