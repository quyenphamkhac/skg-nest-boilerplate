import { User } from 'src/modules/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Todo extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;
}
