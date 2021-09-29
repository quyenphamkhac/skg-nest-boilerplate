import { IsDateString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class UpdateTodoDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  title: string;

  @IsOptional()
  content: string;

  @IsOptional()
  @IsUUID()
  userId: string;

  @IsDateString()
  @IsOptional()
  createdAt: Date;

  @IsDateString()
  @IsOptional()
  updatedAt: Date;
}
