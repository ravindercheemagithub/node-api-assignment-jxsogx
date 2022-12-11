import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { UserConstants } from 'src/constants/constants';
import { ErrorCode } from 'src/constants/error';

export class SignupDto {
  @ApiProperty({
    description: 'username required for signup',
    minimum: 4,
    maximum: 16,
    required: true,
  })
  @IsString({
    message: ErrorCode.InvalidUserName.MESSAGE,
    context: {
      errorCode: ErrorCode.InvalidUserName.CODE,
    },
  })
  @MinLength(UserConstants.USERNAME_MIN_LENGTH)
  @MaxLength(UserConstants.USERNAME_MAX_LENGTH)
  username: string;

  @ApiProperty({
    description: 'first name required to signup',
    required: true,
  })
  @IsString()
  firstname: string;

  @ApiProperty({
    description: 'Last name required to signup',
    required: true,
  })
  @IsString()
  lastname: string;

  @ApiProperty({
    description: 'password required for signup',
    minimum: 6,
    maximum: 20,
    required: true,
  })
  @IsString({
    message: ErrorCode.InvalidPassword.MESSAGE,
    context: {
      errorCode: ErrorCode.InvalidPassword.CODE,
    },
  })
  @MinLength(UserConstants.PASSWORD_MIN_LENGTH)
  @MaxLength(UserConstants.PASSWORD_MAX_LENGTH)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'password is too weak - Please Provide atleast one lowercase, one uppercase, one alphabet and one number with atleast 6 characters',
  })
  password: string;
}
