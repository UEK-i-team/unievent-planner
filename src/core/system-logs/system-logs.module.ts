import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SystemLogsService } from './services/system-logs.service';
import {
  SystemLog,
  SystemLogSchema,
  UserAccount,
  UserAccountSchema,
} from 'src/models';
import { UpserDefaultsService } from 'src/upser-defaults/upser-defaults.service';
import { SystemLogsController } from './controllers/system-logs.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SystemLog.name, schema: SystemLogSchema },
      { name: UserAccount.name, schema: UserAccountSchema },
    ]),
  ],
  providers: [SystemLogsService, UpserDefaultsService],
  controllers: [SystemLogsController],
  exports: [SystemLogsService, UpserDefaultsService],
})
export class SystemLogsModule {}
