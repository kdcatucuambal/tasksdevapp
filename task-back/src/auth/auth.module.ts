import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/models/user/schemas/user.schema';
import { UserService } from 'src/models/user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/models/user/user.module';

@Module({
  imports: [UserModule, JwtModule.register({
    secret: "secret", signOptions: {
      expiresIn: "1h"
    }
  })],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule]
})
export class AuthModule { }
