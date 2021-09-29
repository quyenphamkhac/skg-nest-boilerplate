import { Module } from '@nestjs/common';
import { TodoController } from './todos.controller';
import { TodoService } from './todos.service';
@Module({
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodosModule {}
