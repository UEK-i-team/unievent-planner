import { Exclude, Expose, Transform } from 'class-transformer';
@Exclude()
export abstract class BasicDto {
  @Expose()
  @Transform(
    ({ value, obj }) => {
      if (value && typeof value === 'string') {
        return value;
      } else if (obj._id) {
        return typeof obj._id === 'string' ? obj._id : obj._id.toString();
      } else {
        return undefined;
      }
    },
    { toClassOnly: true },
  )
  id?: string;
}
