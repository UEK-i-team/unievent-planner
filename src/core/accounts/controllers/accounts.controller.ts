import { Controller, Get } from '@nestjs/common';
import { AccountsService } from '../services/accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  findAll(): string {
    return 'success';
  }
}
