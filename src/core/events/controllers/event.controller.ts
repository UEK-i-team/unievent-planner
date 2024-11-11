import { Controller, Get, Post, Body } from '@nestjs/common';
import { EventsService } from '../services/events.service';
import { Event } from 'src/models/event.model';
import { EventDto } from '../dtos/event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly groupService: EventsService) {}
  @Get()
  async getAllEvents(): Promise<Event[]> {
    return this.groupService.findAll();
  }
  @Post()
  async createEvent(@Body() newEvent: EventDto): Promise<Event> {
    return this.groupService.create(newEvent);
  }
}
