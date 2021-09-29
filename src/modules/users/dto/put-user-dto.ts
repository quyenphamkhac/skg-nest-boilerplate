import { IsDateString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class PutUserDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  name: string;

  @IsDateString()
  @IsOptional()
  createdAt: Date;

  @IsDateString()
  @IsOptional()
  updatedAt: Date;
}
