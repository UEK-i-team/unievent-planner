import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SystemLog } from '../../../models/system-log.model';
import { SystemLogDto } from 'src/libs';

@Injectable()
export class SystemLogsService {
  constructor(
    @InjectModel(SystemLog.name) private systemLogModel: Model<SystemLog>,
  ) {}

  async createLog(createLogDto: SystemLogDto): Promise<SystemLog> {
    const newSystemLog = new this.systemLogModel({
      ...createLogDto,
    });
    return newSystemLog.save();
  }

  async findAll(): Promise<SystemLog[]> {
    return this.systemLogModel.find().exec();
  }

  async findLogById(id: string): Promise<SystemLog> {
    return this.systemLogModel.findById(id).exec();
  }
}
