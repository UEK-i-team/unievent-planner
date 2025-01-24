import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsService } from './services/accounts.service';
import { UpserDefaultsService } from 'src/upser-defaults/upser-defaults.service';
import { Role, RoleSchema, UserAccount, UserAccountSchema } from 'src/models';
import { AccountsController } from './controllers/accounts.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserAccount.name, schema: UserAccountSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  controllers: [AccountsController],
  providers: [AccountsService, UpserDefaultsService],
  exports: [AccountsService],
})
export class AccountsModule {}
