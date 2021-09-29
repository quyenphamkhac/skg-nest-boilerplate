import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoRepository } from './repositories/todo.repository';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoRepository) private todoRepository: TodoRepository,
  ) {}
}
