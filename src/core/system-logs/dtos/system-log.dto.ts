import { Expose } from 'class-transformer';

export class SystemLogDto {
  @Expose()
  action!: string;

  @Expose()
  message!: string;

  @Expose()
  context!: string;
}
