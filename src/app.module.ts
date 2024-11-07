import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getMongoConnectionString, PermissionGuard } from './libs';
import { MongooseModels } from './models';
import { UpserDefaultsService } from './upser-defaults/upser-defaults.service';
import { AnnouncementsModule } from './core/announcements/announcements.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: getMongoConnectionString(configService),
      }),
    }),
    MongooseModule.forFeature(MongooseModels),
    AnnouncementsModule,
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: PermissionGuard,
    // },
    UpserDefaultsService,
    Logger,
  ],
})
export class AppModule {}
