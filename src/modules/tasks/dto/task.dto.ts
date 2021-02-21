import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TaskDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'The title of task',
    default: 'title',
  })
  title: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The description of task',
    default: 'description',
  })
  description: string;
}
