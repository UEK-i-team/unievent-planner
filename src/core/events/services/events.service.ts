import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from 'src/models';
import { CreateEventDto } from '../dtos/create-event.dto';
import { plainToClass } from 'class-transformer';
import { UpserDefaultsService } from 'src/upser-defaults/upser-defaults.service';
import { EventDto } from '../dtos/event.dto';
import { UserAccountDto } from 'src/core/accounts/dtos/user-account.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name)
    private eventModel: Model<Event>,
    private upserDefaultsService: UpserDefaultsService,
  ) {}

  async find(): Promise<EventDto[]> {
    const events = await this.eventModel
      .find({ expiresAt: { $gte: new Date() } })
      .populate('createdBy')
      .populate('updatedBy')
      .lean()
      .exec();

    return events.map((events) =>
      plainToClass(EventDto, events, { excludeExtraneousValues: true }),
    );
  }

  async getEvent(group: string): Promise<EventDto[]> {
    const events = await this.eventModel
      .find({ groups: { $in: [group] }, expiresAt: { $gte: new Date() } })
      .populate('createdBy')
      .populate('updatedBy')
      .lean()
      .exec();

    if (!events) {
      throw new NotFoundException();
    }

    return events.map((events) =>
      plainToClass(EventDto, events, { excludeExtraneousValues: true }),
    );
  }

  async createEvent(createEventDto: CreateEventDto): Promise<EventDto> {
    const user: UserAccountDto =
      await this.upserDefaultsService.getSystemAccount();
    const createEventDoc = new this.eventModel();
    createEventDoc.title = createEventDto.title;
    createEventDoc.description = createEventDto.description;
    createEventDoc.startDate = createEventDto.startDate;
    createEventDoc.endDate = createEventDto.endDate;
    createEventDoc.groups = createEventDto.groups;
    createEventDoc.typeModel = createEventDto.typeModel;
    // createEventDoc.status = createEventDto.status;
    createEventDoc.createdAt = new Date();
    createEventDoc.updatedAt = new Date();
    createEventDoc.createdBy = user.id;
    createEventDoc.updatedBy = user.id;

    const newEvent = new this.eventModel(createEventDto);
    const result = await newEvent.save();
    return plainToClass(EventDto, result, {
      excludeExtraneousValues: true,
    });
  }
}
