import { SignupDto } from './dto/signup.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(signupDto: SignupDto): Promise<void> {
    return this.userService.createUser(signupDto);
  }

  async signIn(signinDto: SigninDto): Promise<{ accessToken: string }> {
    const { username, password } = signinDto;
    const user = await this.userService.findOne(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
