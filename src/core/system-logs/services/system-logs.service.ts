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

  async createSystemLog(createSystemLogDto: SystemLogDto): Promise<SystemLog> {
    const newSystemLog = new this.systemLogModel();

    newSystemLog.action = createSystemLogDto.action; // np. 'create', 'update'
    newSystemLog.message = createSystemLogDto.message; // Szczegóły akcji, np. co zostało dodane
    newSystemLog.context = createSystemLogDto.context; // np. 'event', 'announcement'

    return newSystemLog.save();
  }

  async findAll(): Promise<SystemLog[]> {
    return this.systemLogModel.find().exec();
  }

  async findLogById(id: string): Promise<SystemLog> {
    return this.systemLogModel.findById(id).exec();
  }
}
