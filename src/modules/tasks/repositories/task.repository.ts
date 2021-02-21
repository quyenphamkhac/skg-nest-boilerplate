import { TaskStatus } from 'src/common/enums/task-status.enum';
import { User } from 'src/modules/users/entities/user.entity';
import { PaginationDto, PaginationOptions } from 'src/shared/pagination.dto';
import { EntityRepository, ILike, Repository } from 'typeorm';
import { CreateTaskDto } from '../dto/create-task.dto';
import { GetTasksFilterDto } from '../dto/get-tasks-filter.dto';
import { Task } from '../entites/task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getAllTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(task.title ILIKE :search OR task.description ILIKE :search)',
        { search: `%${search}%` },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }

  async getTasks(
    filterDto: GetTasksFilterDto,
    user: User,
    paginationOptions: PaginationOptions,
  ): Promise<PaginationDto<Task>> {
    const { status, search } = filterDto;
    const { limit, offset } = paginationOptions;
    const where = {
      ...(status && { status }),
      ...(search && { title: ILike(`%${search}%`) }),
      ...(search && { description: ILike(`%${search}%`) }),
    };
    if (status) {
      where.status = status;
    }
    const [tasks, total] = await this.findAndCount({
      where,
      take: limit,
      skip: offset,
    });
    return {
      results: tasks,
      total,
      limit,
      offset,
    };
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();

    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    await task.save();
    delete task.user;
    return task;
  }
}
