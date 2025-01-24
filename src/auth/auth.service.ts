import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FirebaseService } from './firebase.service';
import { UserAccount } from 'src/models';
import { AccountsService } from 'src/core/accounts/services/accounts.service';
import { CreateUserAccountDto, UserAccountDto } from 'src/core/accounts/dtos';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserAccount.name) private userModel: Model<UserAccount>,
    private firebaseService: FirebaseService,
    private accountsService: AccountsService,
  ) {}

  async verifyToken(token: string): Promise<UserAccountDto> {
    try {
      const decodedToken = await this.firebaseService.verifyGoogleToken(token);
      let user = await this.accountsService.findByEmail(decodedToken.email);
      if (user === null) {
        try {
          const createUserAccountDto = new CreateUserAccountDto();
          createUserAccountDto.firebaseId = decodedToken.uid;
          createUserAccountDto.email = decodedToken.email;
          createUserAccountDto.firstName = decodedToken.name;
          createUserAccountDto.lastName = null;
          user = await this.accountsService.create(createUserAccountDto);
        } catch (error) {
          throw new UnauthorizedException('Error adding new user');
        }
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
