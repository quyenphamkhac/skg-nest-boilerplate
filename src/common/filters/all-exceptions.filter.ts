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

    response.status(status).json(
      exception instanceof HttpException
        ? {
            ...exception.getResponse().valueOf(),
            status: ResponseStatus.Error,
          }
        : {
            statusCode: status,
            message: 'Internal Server Error',
            status: ResponseStatus.Error,
          },
    );
  }
}
