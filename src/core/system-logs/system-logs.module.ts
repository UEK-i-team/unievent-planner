import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // Do obsługi Mongoose
import { SystemLogsService } from './services/system-logs.service';
import { SystemLog, SystemLogSchema } from 'src/models';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SystemLog.name, schema: SystemLogSchema },
    ]), // Rejestracja modelu Mongoose
  ],
  providers: [SystemLogsService], // Dodanie serwisu do providera
  exports: [SystemLogsService], // Eksportowanie serwisu, żeby można było go używać w innych modułach
})
export class SystemLogsModule {}
