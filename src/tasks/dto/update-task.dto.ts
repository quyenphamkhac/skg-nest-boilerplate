import { TaskStatus } from '../enums/task-status.enum';

export class UpdateTaskDto {
  title: string;
  description: string;
  status: TaskStatus;
}
