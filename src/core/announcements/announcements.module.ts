import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnnouncementsController } from './controllers/announcements.controller';
import { AnnouncementsService } from './services/announcements.service';
import { Announcement, AnnouncementSchema } from 'src/models';
import { UpserDefaultsService } from 'src/upser-defaults/upser-defaults.service';
import { UserAccount, UserAccountSchema } from 'src/models';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Announcement.name, schema: AnnouncementSchema },
      { name: UserAccount.name, schema: UserAccountSchema },
    ]),
  ],
  controllers: [AnnouncementsController],
  providers: [AnnouncementsService, UpserDefaultsService],
})
export class AnnouncementsModule {}
