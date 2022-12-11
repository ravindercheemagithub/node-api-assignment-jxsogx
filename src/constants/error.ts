import { UserConstants } from './constants';

class CodeAndMsg {
  CODE: number;
  MESSAGE: string;
}

export class ErrorCode {
  static readonly SUCCESS: CodeAndMsg = { CODE: 0, MESSAGE: 'success' };
  static readonly ERROR: CodeAndMsg = { CODE: 1, MESSAGE: 'fail' };
  static readonly ParamsError: CodeAndMsg = {
    CODE: 2,
    MESSAGE: 'Parameter error',
  };

  static readonly Forbidden: CodeAndMsg = {
    CODE: 403,
    MESSAGE: 'Does not have permission to perform this operation',
  };
  static readonly NotFound: CodeAndMsg = {
    CODE: 404,
    MESSAGE: 'The requested resource could not be found',
  };

  static readonly LoginError: CodeAndMsg = {
    CODE: 1000,
    MESSAGE: 'wrong user name or password',
  };
  static readonly LoginTimeout: CodeAndMsg = {
    CODE: 1001,
    MESSAGE: 'login timed out',
  };
  static readonly InActive: CodeAndMsg = {
    CODE: 1002,
    MESSAGE: 'Account not activated',
  };

  static readonly TokenError: CodeAndMsg = {
    CODE: 1003,
    MESSAGE: 'token error',
  };
  static readonly Frozen: CodeAndMsg = {
    CODE: 1004,
    MESSAGE: 'Account has been frozen',
  };

  static readonly InvalidUserName: CodeAndMsg = {
    CODE: 1005,
    MESSAGE: `Nickname is not in the correct format, it needs to be${UserConstants.USERNAME_MIN_LENGTH}arrive${UserConstants.USERNAME_MAX_LENGTH}characters, can only contain English, underscore, and cannot contain spaces. `,
  };

  static readonly InvalidPassword: CodeAndMsg = {
    CODE: 1008,
    MESSAGE: `The password needs to be${UserConstants.PASSWORD_MIN_LENGTH}arrive${UserConstants.PASSWORD_MAX_LENGTH}between characters`,
  };

  static readonly UserNameExists: CodeAndMsg = {
    CODE: 1009,
    MESSAGE: 'Username already exists',
  };

  static CodeToMessage(code: number): string {
    for (const key of Object.keys(this)) {
      if (this[key].CODE === code) {
        return this[key].MESSAGE;
      }
    }
    return '';
  }

  static HasCode(code: number): boolean {
    for (const key of Object.keys(this)) {
      if (this[key].CODE === code) {
        return true;
      }
    }
    return false;
  }
}
