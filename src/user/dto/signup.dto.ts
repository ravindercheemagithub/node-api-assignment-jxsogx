import { IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { UserConstants } from 'src/constants/constants';
import { ErrorCode } from 'src/constants/error';

export class SignupDto {
  @IsString({
    message: ErrorCode.InvalidUserName.MESSAGE,
    context: {
      errorCode: ErrorCode.InvalidUserName.CODE,
    },
  })
  @MinLength(UserConstants.USERNAME_MIN_LENGTH)
  @MaxLength(UserConstants.USERNAME_MAX_LENGTH)
  username: string;

  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

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
