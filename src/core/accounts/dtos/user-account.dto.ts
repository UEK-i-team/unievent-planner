import { Expose, Type } from 'class-transformer';
import { IsDefined } from 'class-validator';
import { AccountBasicDto, SystemStatus } from '../../../libs';
import { GroupDto } from '../../groups/dtos/group.dto';
import { RoleDto } from '../../roles/dtos/role.dto';

export class UserAccountDto extends AccountBasicDto {
  @Expose()
  firstName?: string;

  @Expose()
  lastName?: string;

  @Expose()
  email!: string;

  @Expose()
  @Type(() => RoleDto)
  role!: RoleDto[];

  @Expose()
  @Type(() => GroupDto)
  groups!: GroupDto[];

  @Expose()
  @IsDefined()
  status!: SystemStatus;

  @Expose()
  firebaseId!: string;

  get fullName(): string {
    const fullName = [this.firstName, this.lastName].filter(Boolean).join(' ');
    if (fullName) {
      return fullName;
    } else {
      return this.email;
    }
  }

  get initials(): string {
    if (this.firstName && this.lastName) {
      return `${this.firstName[0].toUpperCase()}${this.lastName[0].toUpperCase()}`;
    } else if (this.firstName) {
      return `${this.firstName[0].toUpperCase()}`;
    } else if (this.lastName) {
      return `${this.lastName[0].toUpperCase()}`;
    } else {
      return this.username.slice(0, 1).toUpperCase();
    }
  }
}
