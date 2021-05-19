import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from './../models/user/user.service';
//import { JWTPayload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader("auth"),
      ignoreExpiration: true,
      secretOrKey: "secret",
    });
  }

  async validate(payload: any): Promise<any> {
   
    console.log("Payload: ", payload);

    //const user = await this.usersService.getUserById(payload.userId);
    if (!payload) {
      throw new UnauthorizedException();
    }
    return new Promise((resolve, reject) => {
      resolve(payload._id);
    });
  }
}
