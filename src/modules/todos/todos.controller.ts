import { Controller } from '@nestjs/common';
import { TodoRepository } from './repositories/todo.repository';

@Controller('todos')
export class TodoController {
  constructor(private todosService: TodoRepository) {}
}
