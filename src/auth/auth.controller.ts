import {
  Controller,
  Post,
  Headers,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import * as admin from 'firebase-admin';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('verify-token')
  @HttpCode(HttpStatus.OK)
  async verifyToken(
    @Headers('Authorization') authorization: string,
  ): Promise<{ decodedToken: admin.auth.DecodedIdToken }> {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token is required');
    }

    const token = authorization.replace('Bearer ', '');
    const decodedToken = await this.authService.verifyToken(token);

    return {
      decodedToken: decodedToken as unknown as admin.auth.DecodedIdToken,
    };
  }
}
