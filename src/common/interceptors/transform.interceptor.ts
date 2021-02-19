import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseStatus } from 'src/common/enums/response-status.enum';

export interface Response<T> {
  status: ResponseStatus;
  data: T;
  statusCode?: number;
  message?: string;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const { statusCode } = context.switchToHttp().getResponse();
    return next.handle().pipe(
      map((data) => ({
        status: ResponseStatus.Success,
        data,
        statusCode,
      })),
    );
  }
}
