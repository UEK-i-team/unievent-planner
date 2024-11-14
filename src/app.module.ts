import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
//TODO Uncomment when ready
//import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConnectionString /* PermissionGuard */ } from './libs';
import { MongooseModels } from './models';
import { UpserDefaultsService } from './upser-defaults/upser-defaults.service';
import { AuthModule } from './auth/auth.module';

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
    AuthModule,
  ],
  controllers: [],
  providers: [
    //  TODO : Uncomment when ready
    // {
    //  provide: APP_GUARD,
    //  useClass: PermissionGuard,
    // },
    UpserDefaultsService,
    Logger,
  ],
})
export class AppModule {}
