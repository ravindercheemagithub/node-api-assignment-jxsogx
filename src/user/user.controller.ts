import { SigninDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
@ApiTags('auth')
@ApiBearerAuth('defaultBearerAuth')
@Controller('user')
export class UserController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiBody({
    type: SignupDto,
    description: 'Sign-up Dto',
    required: true,
    isArray: false,
  })
  @Post('/signup')
  @ApiCreatedResponse({ description: 'User has successfully Signed up' })
  @ApiConflictResponse({ description: 'User already exists' })
  signUp(@Body() signupDto: SignupDto): Promise<void> {
    return this.authService.signUp(signupDto);
  }

  @ApiOperation({ summary: 'Sign-in existing users' })
  @ApiBody({
    type: SigninDto,
    description: 'Sign-in Dto',
    required: true,
    isArray: false,
  })
  @ApiOkResponse({ description: 'User has successfully Signed in.' })
  @ApiUnauthorizedResponse({ description: 'Either wrong username or password' })
  @Post('/signin')
  @HttpCode(200)
  signIn(@Body() signinDto: SigninDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(signinDto);
  }
}
