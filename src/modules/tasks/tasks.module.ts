import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/auth/auth.module';
import { CaslModule } from 'src/modules/casl/casl.module';
import { TaskRepository } from './repositories/task.repository';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([TaskRepository]), CaslModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
