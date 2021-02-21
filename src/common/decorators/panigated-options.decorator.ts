import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from 'src/constants/predefined';
import { PaginationOptions } from 'src/shared/pagination.dto';

export const Pagination = createParamDecorator(
  (data, ctx: ExecutionContext): PaginationOptions => {
    const req = ctx.switchToHttp().getRequest();
    const paginationOptions = new PaginationOptions();
    paginationOptions.limit = +req.query.limit || DEFAULT_LIMIT;
    paginationOptions.offset = +req.query.offset || DEFAULT_OFFSET;
    return paginationOptions;
  },
);
