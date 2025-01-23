import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FirebaseService } from './firebase.service';
import { UpserDefaultsService } from '../upser-defaults/upser-defaults.service';
import { UserAccount } from 'src/models';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserAccount.name) private userModel: Model<UserAccount>,
    private firebaseService: FirebaseService,
    private upserDefaultsService: UpserDefaultsService,
  ) {}

  async verifyToken(token: string): Promise<UserAccount> {
    try {
      const decodedToken = await this.firebaseService.verifyGoogleToken(token);
      let user = await this.userModel.findOne({ email: decodedToken.email });
      if (user === null) {
        try {
          // eslint-disable-next-line prettier/prettier
          const systemUser = (await this.upserDefaultsService.getSystemAccount()).id;
          const userRole = (await this.upserDefaultsService.getUserRole()).id;
          const newUser = new this.userModel({
            firebaseId: decodedToken.uid,
            email: decodedToken.email,
            username: decodedToken.email.split('@')[0],
            firstName: decodedToken.name,
            lastName: null,
            groups: [],
            role: [userRole],
            createdBy: systemUser,
            updatedBy: systemUser,
          });
          await newUser.save();
          user = newUser;
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
