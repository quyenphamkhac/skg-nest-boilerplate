import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { TodoRepository } from './repositories/todo.repository';
import { TodoController } from './todos.controller';
import { TodoService } from './todos.service';
@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([TodoRepository])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodosModule {}
