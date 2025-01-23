import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { Roles } from './libs/shared/decorators/roles.decorator';

@Controller()
export class AppController {
  @Get('admin-route')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  getAdminRoute(): string {
    return 'This is an admin route';
  }

  @Get('user-route')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('USER')
  getUserRoute(): string {
    return 'This is a user route';
  }
}
