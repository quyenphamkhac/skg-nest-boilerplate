import { NotFoundException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTodoDto } from '../dto/create-todo-dto';
import { UpdateTodoDto } from '../dto/update-todo-dto';
import { Todo } from '../entities/todo.entity';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  async createTodo(payload: CreateTodoDto): Promise<Todo> {
    const { id, title, content, userId, createdAt, updatedAt } = payload;
    const todo = this.create({
      id,
      title,
      content,
      userId,
      createdAt,
      updatedAt,
    });
    await todo.save();
    return todo;
  }

  async updateTodo(id: string, payload: UpdateTodoDto): Promise<Todo> {
    const todo = await this.findOne(id);
    if (!todo) throw new NotFoundException(`Todo with id ${id} is not found.`);
    const { userId, title, content, createdAt, updatedAt } = payload;
    if (userId) todo.userId = userId;
    if (createdAt) todo.createdAt = createdAt;
    if (updatedAt) todo.updatedAt = updatedAt;
    if (title) todo.title = title;
    if (content) todo.content = content;
    await todo.save();
    return todo;
  }
}
