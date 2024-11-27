import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { randomBytes } from 'crypto';
import mongoose, { Model } from 'mongoose';
import { UserAccountDto } from 'src/core/accounts/dtos';
import { GroupDto } from 'src/core/groups/dtos';
import { AccountBasicDto, BasicDto } from 'src/libs';
import { UUIDSchemaType } from 'src/libs/internal/uuid.type';
import { Group, UserAccount } from 'src/models';

@Injectable()
export class codeService {
  constructor(
    @InjectModel(UserAccount.name)
    private readonly userAccountModel: Model<UserAccount>,
    @InjectModel(Group.name) private readonly groupModel: Model<Group>,
  ) {}

  private generateCode(length: number = 6): string {
    return randomBytes(length)
      .toString('base64')
      .replace(/[^a-zA-Z0-9]/g, '')
      .substring(0, length);
  }

  async joinGroup(groupId: string, userId: string): Promise<void> {
    const groupUpdateResult = await this.groupModel.findByIdAndUpdate(
      groupId,
      { $addToSet: { members: userId } },
      { new: true },
    );
    if (!groupUpdateResult) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

    const userUpdateResult = await this.userAccountModel.findByIdAndUpdate(
      userId,
      { $addToSet: { groups: groupId } },
      { new: true },
    );
    if (!userUpdateResult) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  }

  async removeStudentFromGroup(groupId: string, userId: string): Promise<void> {
    const groupUpdateResult = await this.groupModel.findByIdAndUpdate(
      groupId,
      { $pull: { members: userId } },
      { new: true },
    );
    if (!groupUpdateResult) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

    const userUpdateResult = await this.userAccountModel.findByIdAndUpdate(
      userId,
      { $pull: { groups: groupId } },
      { new: true },
    );
    if (!userUpdateResult) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
  }
}
