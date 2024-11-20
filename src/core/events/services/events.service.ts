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

  async find(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }
  async getEvent(group: string): Promise<Event> {
    return this.eventModel.findOne({ group }).exec();
  }
  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const newEvent = new this.eventModel(createEventDto);
    return newEvent.save();
  }
}
