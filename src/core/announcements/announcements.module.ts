import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnnouncementsController } from './controllers/announcements.controller';
import { AnnouncementsService } from './services/announcements.service';
import {
  Announcement,
  AnnouncementSchema,
} from '../../models/announcement.model';
import { SystemLogsModule } from '../system-logs/system-logs.module'; // Importuj cały moduł SystemLogsModule

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Announcement.name, schema: AnnouncementSchema },
    ]),
    SystemLogsModule, // Import SystemLogsModule
  ],
  controllers: [AnnouncementsController],
  providers: [AnnouncementsService],
})
export class AnnouncementsModule {}
