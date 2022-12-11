import { HttpStatus, HttpException } from '@nestjs/common';
import { ErrorCode } from '../../constants/error';

class CurrencyServiceExceptionData {
  errorCode?: number;
  message?: string;
}

export class CurrencyServiceException extends HttpException {
  constructor(expData: CurrencyServiceExceptionData, status?: HttpStatus) {
    if (typeof expData.errorCode === 'undefined') {
      expData.errorCode = ErrorCode.ParamsError.CODE;
    }
    super(expData, status || HttpStatus.OK);
  }
}
