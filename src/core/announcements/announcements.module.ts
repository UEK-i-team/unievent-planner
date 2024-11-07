import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnnouncementsController } from './controllers/announcements.controller';
import { AnnouncementsService } from './services/announcements.service';
import {
  Announcement,
  AnnouncementSchema,
} from '../../models/announcement.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Announcement.name, schema: AnnouncementSchema },
    ]),
  ],
  controllers: [AnnouncementsController],
  providers: [AnnouncementsService],
})
export class AnnouncementsModule {}
