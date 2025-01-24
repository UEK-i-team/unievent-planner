import { Expose, Type } from 'class-transformer';
import { IsString, IsEmail } from 'class-validator';
import { RoleDto } from 'src/core/roles/dtos';

export class CreateUserAccountDto {
  @Expose()
  @IsString()
  firstName?: string;

  @Expose()
  @IsString()
  lastName?: string;

  @Expose()
  @IsEmail()
  email!: string;

  @Expose()
  @Type(() => RoleDto)
  roles!: RoleDto[];

  @Expose()
  @IsString()
  firebaseId!: string;
}
