import { Module } from '@nestjs/common';
import { CodeService } from './service/code.service';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { MongooseModels } from 'src/models';

@Module({
  imports: [MongooseModule.forFeature(MongooseModels)],
  providers: [CodeService],
  exports: [CodeService],
})
export class CodeModule {}
