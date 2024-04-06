import { StatusCodes } from 'http-status-codes';
import { BadRequestException } from '@nestjs/common';
import { HttpErrorCode } from '@app/core/common/common.types';

export class ApiException extends BadRequestException {
  constructor(message: string = '', errors = null) {
    super({
      status: StatusCodes.BAD_REQUEST,
      error: HttpErrorCode.REST_ERROR,
      message,
      errors,
    });
  }
}
