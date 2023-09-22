import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Status } from '../model/task.model';
import { User } from '../../auth/users/user.entity';
import { Exclude } from 'class-transformer';

// @Entity annotation to tell orm that Task is an entity or table for db having columns using @Column
// @PrimaryGeneratedColumn to make id as primary column by automatically generating id using uuid library
@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: Status;

  // implement ManyToOne rln for tasks, One user can have many tasks
  // eager set to false means whenever we fetch tasks, then we don't fetch user
  // exclude this property and show only when coonverting from class objects to plain objects
  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
