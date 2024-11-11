import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from 'src/models/event.model';
import { CreateEventDto } from '../dtos/create-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
  ) {}

  async findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }
  async create(createEventDto: CreateEventDto): Promise<Event> {
    const newEvent = new this.eventModel({
      ...createEventDto,
      // TODO: add validation of user's username with token and assigne it below
      createdBy: 'test',
      updatedBy: 'test',
    });
    return newEvent.save();
  }
}
