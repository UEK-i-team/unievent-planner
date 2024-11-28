import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGroupDto } from '../dtos/create-group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Group } from 'src/models';
import { Model, Types } from 'mongoose';
import { plainToClass } from 'class-transformer';
import { GroupDto } from '../dtos/group.dto';
import { UserAccountDto } from 'src/core/accounts/dtos';
import { UpserDefaultsService } from '../../../upser-defaults/upser-defaults.service';
@Injectable()
export class GroupsService {
  constructor(private readonly upserDefaultsService: UpserDefaultsService) {}
  @InjectModel(Group.name) private readonly GroupModel: Model<Group>;

  private toObjectId(id: string): Types.ObjectId {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException(`Invalid ObjectId: ${id}`);
    }
    return new Types.ObjectId(id);
  }

  async createGroup(createGroupDto: CreateGroupDto): Promise<CreateGroupDto> {
    const createGroupDoc = new this.GroupModel();

    const user: UserAccountDto =
      await this.upserDefaultsService.getSystemAccount();
    createGroupDoc.president = user.id;
    createGroupDoc.updatedAt = new Date();
    createGroupDoc.createdAt = new Date();
    createGroupDoc.updatedBy = user.id;
    createGroupDoc.createdBy = user.id;
    createGroupDoc.name = createGroupDto.name;
    createGroupDoc.courseName = createGroupDto.courseName;
    createGroupDoc.description = createGroupDto.description;
    createGroupDoc.avatarUrl = createGroupDto.avatarUrl;
    // todo: dodac generowanie join code
    createGroupDoc.joinCodes = [];
    //
    const result = await createGroupDoc.save();
    return plainToClass(CreateGroupDto, result, {
      excludeExtraneousValues: true,
    });
  }

  async getGroup(id: string): Promise<GroupDto | null> {
    const group = await this.GroupModel.findById(id)
      .populate('members')
      .populate('joinCodes')
      .lean()
      .exec();
    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
    return plainToClass(GroupDto, group, {
      excludeExtraneousValues: true,
    });
  }

  async find(): Promise<GroupDto[]> {
    const groups = await this.GroupModel.find()
      .populate('members')
      .populate('joinCodes')
      .lean()
      .exec();
    if (!groups) {
      throw new NotFoundException(`There are no groups`);
    }
    return groups.map((currentElement) =>
      plainToClass(GroupDto, currentElement, {
        excludeExtraneousValues: true,
      }),
    );
  }

  private async groupExists(id: string): Promise<boolean> {
    const group = await this.GroupModel.findById(id).lean().exec();
    if (!id) {
      return false;
    }
    return !!group;
  }

  async remove(id: string): Promise<{ statusCode: number }> {
    const objectId = this.toObjectId(id);
    const group = await this.GroupModel.findOneAndDelete(objectId).exec();

    if (!group) {
      throw new NotFoundException(`Group with ID or code ${id} not found`);
    }
    return { statusCode: HttpStatus.NO_CONTENT };
  }
}
