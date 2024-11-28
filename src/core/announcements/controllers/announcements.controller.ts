import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AnnouncementsService } from '../services/announcements.service';
import { AnnouncementDto, CreateAnnouncementDto } from '../dtos';

@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Post()
  async create(
    @Body() createAnnouncementDto: CreateAnnouncementDto,
  ): Promise<AnnouncementDto> {
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
  async deleteById(@Param('id') id: string): Promise<{ statusCode: number }> {
    return this.announcementsService.deleteById(id);
  }
}
