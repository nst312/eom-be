import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { InvalidFormException } from '../exceptions/invalid.form.exception';

@Catch(InvalidFormException)
export class InvalidFormExceptionFilter implements ExceptionFilter {
  catch(exception: InvalidFormException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      errors:
        status === HttpStatus.INTERNAL_SERVER_ERROR
          ? 'Sorry we are experiencing technical problems.'
          : exception.getFieldErrors(),
    });
  }
}
