import { Expose } from 'class-transformer';

export class SystemLogDto {
  @Expose()
  action!: string;

  @Expose()
  details!: string;

  @Expose()
  context!: string;
}
