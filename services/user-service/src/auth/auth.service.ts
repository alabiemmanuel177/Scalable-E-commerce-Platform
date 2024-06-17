import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async login(user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async googleLogin(user: User) {
    return this.login(user);
  }

  async validateOAuthLogin(profile: any): Promise<User> {
    let user = await this.userService.findByEmail(profile.emails[0].value);
    if (!user) {
      user = await this.userService.createOAuthUser(profile);
    }
    return user;
  }
}
