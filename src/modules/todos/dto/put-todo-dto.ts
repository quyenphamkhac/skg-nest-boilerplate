import { IsDateString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class PutTodoDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  title: string;

  @IsOptional()
  content: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsDateString()
  @IsOptional()
  createdAt: Date;

  @IsDateString()
  @IsOptional()
  updatedAt: Date;
}
