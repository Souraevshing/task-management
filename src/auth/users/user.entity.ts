import { Task } from '../../tasks/entity/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  // implement OneToMany rln to map user to task. Many tasks can have one user
  // eager set to true means whenever we fetch user, then we fetch tasks
  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}
