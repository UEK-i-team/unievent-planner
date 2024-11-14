import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FirebaseService } from './firebase.service';
import { UserAccount } from 'src/models';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserAccount.name) private userModel: Model<UserAccount>,
    private firebaseService: FirebaseService,
  ) {}

  async verifyToken(token: string): Promise<UserAccount> {
    if (process.env.FIREBASE_AUTH_EMULATOR_HOST) {
      return {
        uid: 'ktos',
        email: 'ktoscos@cos.com',
        username: 'ktos',
        firstName: 'Skubi',
        lastName: 'Dubi',
        groups: [],
      } as unknown as UserAccount;
    }

    try {
      const decodedToken = await this.firebaseService.verifyGoogleToken(token);

      let user = await this.userModel.findOne({ email: decodedToken.email });

      if (!user) {
        const newUser = new this.userModel({
          firebaseId: decodedToken.uid,
          email: decodedToken.email,
          username: decodedToken.email.split('@')[0],
          firstName: decodedToken.name,
          lastName: null,
          groups: [],
          roles: [],
        });

        await newUser.save();
        user = newUser;
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid Firebase token');
    }
  }
}
