import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ResponseStatus } from '../enums/response-status.enum';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let resp = {};
    if (exception instanceof HttpException) {
      const httpException = exception.getResponse().valueOf();
      console.log(httpException);
      if (typeof httpException === 'object') {
        resp = {
          ...httpException,
          status: ResponseStatus.Error,
        };
      }
    } else {
      resp = {
        statusCode: status,
        message: 'Internal Server Error',
        status: ResponseStatus.Error,
      };
    }

    response.status(status).json(resp);
  }
}
