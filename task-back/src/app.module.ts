import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { URLDB } from './app.database';
import { ProjectModule } from './models/project/project.module';
@Module({
  imports: [MongooseModule.forRoot(URLDB), ProjectModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
