import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
export class PaginationOptions {
  @IsNumber()
  @IsOptional()
  limit: number;

  @IsNumber()
  @IsOptional()
  offset: number;
}

export class PaginationDto<TData> {
  @ApiProperty()
  total: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  offset: number;

  items: TData[];
}
