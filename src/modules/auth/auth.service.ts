import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    // if (user) {
    //   if (bcrypt.compareSync(password, user.password)) {
    //     const payload = { sub: user._id, username: user.firstName };
    //     return {
    //       access_token: await this.jwtService.signAsync(payload),
    //     };
    //   }
    // } else throw new UnauthorizedException();
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user._id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
