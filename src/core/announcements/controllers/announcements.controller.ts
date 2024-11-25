import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AnnouncementsService } from '../services/announcements.service';
import { AnnouncementDto, CreateAnnouncementDto } from '../dtos';
import { Announcement } from 'src/models/announcement.model';
import { SystemLogDto } from 'src/libs';

@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Post()
  async create(
    @Body() createAnnouncementDto: CreateAnnouncementDto,
    systemLogDto: SystemLogDto,
  ): Promise<Announcement> {
    return this.announcementsService.create(createAnnouncementDto);
  }

  @Get()
  async find(): Promise<AnnouncementDto[]> {
    return this.announcementsService.find();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<AnnouncementDto> {
    return this.announcementsService.findById(id);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<void> {
    return this.announcementsService.deleteById(id);
  }
}
