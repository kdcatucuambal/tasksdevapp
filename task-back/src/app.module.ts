import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { URLDB } from './app.database';
import { ProjectModule } from './models/project/project.module';
import { TaskModule } from './models/task/task.module';
import { UserModule } from './models/user/user.module';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [MongooseModule.forRoot(URLDB),
    ProjectModule,
    TaskModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
