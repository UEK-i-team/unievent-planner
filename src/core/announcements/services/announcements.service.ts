import { Injectable, NotFoundException } from '@nestjs/common';
import { Announcement } from '../../../models/announcement.model';
import { Model } from 'mongoose';
import { CreateAnnouncementDto } from '../dtos';
import { AnnouncementDto } from '../dtos';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { SystemLogsService } from 'src/libs';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectModel(Announcement.name)
    private announcementModel: Model<Announcement>,
    private readonly systemLogsService: SystemLogsService,
  ) {}

  async create(
    createAnnouncementDto: CreateAnnouncementDto,
  ): Promise<Announcement> {
    // TODO: add validation of user's username with token and assigne it below
    const user: string = 'test';
    const createAnnouncementDoc = new this.announcementModel();
    createAnnouncementDoc.createdBy = user;
    createAnnouncementDoc.updatedBy = user;
    createAnnouncementDoc.title = createAnnouncementDto.title;
    createAnnouncementDoc.description = createAnnouncementDto.description;
    createAnnouncementDoc.expiresAt = createAnnouncementDto.expiresAt;
    createAnnouncementDoc.important = createAnnouncementDto.important;
    createAnnouncementDoc.createdAt = new Date();
    createAnnouncementDoc.updatedAt = new Date();

    // this.systemLogsService.createLog()
    return createAnnouncementDoc.save();
  }

  async find(): Promise<AnnouncementDto[]> {
    const announcement = await this.announcementModel
      .find()
      .select('-__v')
      .lean()
      .exec();

    return announcement.flat().map((el) => plainToClass(AnnouncementDto, el));
  }

  async findById(id: string): Promise<AnnouncementDto | null> {
    const announcement = await this.announcementModel
      .findById(id)
      .select('-__v')
      .lean()
      .exec();

    if (!announcement) {
      throw new NotFoundException(`Annoncement with ID ${id} not found`);
    }

    return plainToClass(AnnouncementDto, announcement);
  }

  async deleteById(id: string): Promise<void> {
    // TODO: check with token if user is the owner of announcement
    const announcement = await this.announcementModel
      .findOneAndDelete({ _id: id })
      .exec();

    if (!announcement) {
      throw new NotFoundException(`Annoncement with ID ${id} not found`);
    }
  }
}
