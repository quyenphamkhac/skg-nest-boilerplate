import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Pagination } from 'src/common/decorators/panigated-options.decorator';
import { PaginationDto, PaginationOptions } from 'src/shared/pagination.dto';
import { CreateTodoDto } from './dto/create-todo-dto';
import { PutTodoDto } from './dto/put-todo-dto';
import { UpdateTodoDto } from './dto/update-todo-dto';
import { Todo } from './entities/todo.entity';
import { TodoService } from './todos.service';

@Controller('todos')
export class TodoController {
  constructor(private todosService: TodoService) {}

  @Get()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(
    @Pagination() paginationOptions: PaginationOptions,
  ): Promise<PaginationDto<Todo>> {
    return this.todosService.findAll(paginationOptions);
  }

  @Get('/:id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  async findById(@Param('id', ParseUUIDPipe) id: string): Promise<Todo> {
    return this.todosService.findTodoById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  async createOrder(@Body() payload: CreateTodoDto): Promise<Todo> {
    return this.todosService.createTodo(payload);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  async updateById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todosService.updateTodoById(id, payload);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  async putById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: PutTodoDto,
  ): Promise<Todo> {
    return this.todosService.putTodoById(id, payload);
  }

  @Delete('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async deleteById(@Param('id', ParseUUIDPipe) id: string): Promise<Todo> {
    return this.todosService.deleteUserById(id);
  }
}
