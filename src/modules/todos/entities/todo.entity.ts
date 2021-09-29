import { User } from 'src/modules/users/entities/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Todo extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;

  @Column()
  userId: string;
}
