import { Controller } from '@nestjs/common';
import { TodoService } from './todos.service';

@Controller('todos')
export class TodoController {
  constructor(private todosService: TodoService) {}
}
