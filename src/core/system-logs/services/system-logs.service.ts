import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SystemLog } from '../../../models/system-log.model';
import { SystemLogDto } from 'src/libs';
import { UpserDefaultsService } from '../../../upser-defaults/upser-defaults.service';

@Injectable()
export class SystemLogsService {
  constructor(
    @InjectModel(SystemLog.name) private systemLogModel: Model<SystemLog>,
    private readonly upserDefaultService: UpserDefaultsService,
  ) {}

  async createSystemLog(systemLogDto: SystemLogDto): Promise<SystemLog> {
    const user = await this.upserDefaultService.getSystemAccount();

    const newSystemLog = new this.systemLogModel({
      ...systemLogDto,
      updatedBy: user.id,
      createdBy: user.id,
    });

    return newSystemLog.save();
  }

  async findAll(): Promise<SystemLog[]> {
    return this.systemLogModel.find().exec();
  }

  async findById(id: string): Promise<SystemLog> {
    const systemLog = await this.systemLogModel.findById(id).exec();
    if (!systemLog) {
      throw new NotFoundException(`SystemLog with id ${id} not found`);
    }
    return systemLog;
  }
}
