import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signupDto: SignupDto): Promise<void> {
    return this.authService.signUp(signupDto);
  }

  @Post('/signin')
  @HttpCode(200)
  signIn(@Body() signinDto: SigninDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(signinDto);
  }
}
