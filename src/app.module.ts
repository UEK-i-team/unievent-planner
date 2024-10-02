import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = `mongodb://${configService.get<string>('MONGODB_HOST')}:${configService.get<string>('MONGODB_PORT')}/${configService.get<string>('MONGODB_DATABASE')}`;
        return { uri };
      },
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
