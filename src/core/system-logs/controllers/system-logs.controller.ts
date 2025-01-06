import { Controller, Get, Param } from '@nestjs/common';
import { SystemLogsService } from '../services/system-logs.service';
import { SystemLog } from '../../../models/system-log.model';

@Controller('system-logs')
export class SystemLogsController {
  constructor(private readonly systemLogsService: SystemLogsService) {}

  @Get()
  async findAll(): Promise<SystemLog[]> {
    return this.systemLogsService.findAll();
  }

  @Get(':id')
  async findLogById(@Param('id') id: string): Promise<SystemLog> {
    return this.systemLogsService.findById(id);
  }
}
