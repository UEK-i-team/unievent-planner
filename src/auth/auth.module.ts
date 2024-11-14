import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { FirebaseService } from './firebase.service';
import { UserAccount, UserAccountSchema } from 'src/models';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserAccount.name, schema: UserAccountSchema },
    ]),
  ],
  providers: [AuthService, AuthGuard, FirebaseService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
