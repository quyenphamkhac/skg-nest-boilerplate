import {
  BaseEntity,
  Column,
  Entity,
  Unique,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Todo } from 'src/modules/todos/entities/todo.entity';
import { Task } from 'src/modules/tasks/entites/task.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  name: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];

  @OneToMany(() => Task, (task) => task.user)
  tasks: Todo[];

  @Column()
  salt: string;

  @Column()
  password: string;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
