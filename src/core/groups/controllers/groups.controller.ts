import {
  Controller,
  Post,
  Body,
  Delete,
  HttpCode,
  Param,
  Get,
} from '@nestjs/common';
import { CodeService } from 'src/core/join-codes/service/code.service';
import { GroupsService } from '../service/groups.service';
import { CreateGroupDto } from '../dtos/create-group.dto';
import { GroupDto } from '../dtos/group.dto';

@Controller('groups')
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly codeService: CodeService,
  ) {}

  @Get(':id')
  async getGroup(@Param('id') id: string): Promise<GroupDto> {
    return this.groupsService.getGroup(id);
  }

  @Get()
  async find(): Promise<GroupDto[]> {
    return this.groupsService.find();
  }

  @Post()
  @HttpCode(201)
  create(@Body() createGroupDto: CreateGroupDto): Promise<CreateGroupDto> {
    return this.groupsService.createGroup(createGroupDto);
  }

  @Post('join')
  joinGroup(@Body() userId: string, @Body() groupId: string): Promise<void> {
    return this.codeService.joinGroup(
      (groupId = '6748513063dce30683e85ce5'),
      (userId = '67483ffd014acab29547a6c8'),
    );
  }

  @Delete('deleteStudent')
  removeStudentFromGroup(
    @Body() userId: string,
    @Body() groupId: string,
  ): Promise<void> {
    return this.codeService.removeStudentFromGroup(
      (groupId = '6748513063dce30683e85ce5'),
      (userId = '67483ffd014acab29547a6c8'),
    );
  }

  @Delete(':idOrCode')
  remove(@Param('idOrCode') id: string): Promise<{ statusCode: number }> {
    return this.groupsService.remove(id);
  }
}
