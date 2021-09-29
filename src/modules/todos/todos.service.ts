import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto, PaginationOptions } from 'src/shared/pagination.dto';
import { CreateTodoDto } from './dto/create-todo-dto';
import { PutTodoDto } from './dto/put-todo-dto';
import { UpdateTodoDto } from './dto/update-todo-dto';
import { Todo } from './entities/todo.entity';
import { TodoRepository } from './repositories/todo.repository';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoRepository) private todoRepository: TodoRepository,
  ) {}

  async findAll(
    paginationOptions: PaginationOptions,
  ): Promise<PaginationDto<Todo>> {
    const { limit, offset } = paginationOptions;
    const where = {};
    const [users, total] = await this.todoRepository.findAndCount({
      where,
      take: limit,
      skip: offset,
    });
    return {
      items: users,
      total,
      limit,
      offset,
    };
  }

  async findTodoById(id: string): Promise<Todo> {
    const found = await this.todoRepository.findOne(id);
    if (!found) throw new NotFoundException(`Todo with id ${id} is not found.`);
    return found;
  }

  async createTodo(payload: CreateTodoDto): Promise<Todo> {
    const { id } = payload;
    const found = await this.todoRepository.findOne(id);
    if (found) throw new ConflictException(`Todo with id ${id} is existed.`);
    return this.todoRepository.createTodo(payload);
  }

  async updateTodoById(id: string, payload: UpdateTodoDto): Promise<Todo> {
    if (id !== payload.id)
      throw new BadRequestException(
        `Param id ${id} and payload id ${payload.id} must be the same.`,
      );

    return this.todoRepository.updateTodo(id, payload);
  }

  async putTodoById(id: string, payload: PutTodoDto): Promise<Todo> {
    if (id !== payload.id)
      throw new BadRequestException(
        `Param id ${id} and payload id ${payload.id} must be the same.`,
      );
    const found = await this.todoRepository.findOne(id);
    if (found) return this.todoRepository.updateTodo(id, payload);
    else return this.todoRepository.createTodo(payload);
  }

  async deleteUserById(id: string): Promise<Todo> {
    const found = await this.todoRepository.findOne(id);
    if (!found) throw new NotFoundException(`Todo with id ${id} is not found.`);
    await this.todoRepository.delete(id);
    return found;
  }
}
