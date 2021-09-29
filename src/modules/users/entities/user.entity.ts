import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  CreateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Todo } from 'src/modules/todos/entities/todo.entity';
import { Task } from 'src/modules/tasks/entites/task.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  name: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];

  @OneToMany(() => Task, (task) => task.user)
  tasks: Todo[];

  @Column({ nullable: true })
  salt: string;

  @Column({ nullable: true })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
