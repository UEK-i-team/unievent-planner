import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EventsService } from '../services/events.service';
import { Event } from 'src/models/event.model';
import { EventDto } from '../dtos/event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}
  @Get()
  async find(): Promise<Event[]> {
    return this.eventService.find();
  }
  @Get(':group')
  async getEvent(@Param('group') group: string): Promise<Event> {
    return this.eventService.getEvent(group);
  }
  @Post()
  async createEvent(@Body() newEvent: EventDto): Promise<Event> {
    return this.eventService.createEvent(newEvent);
  }
}
