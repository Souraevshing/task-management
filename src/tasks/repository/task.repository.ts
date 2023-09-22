import { EntityRepository, Repository } from 'typeorm';
import { Task } from '../entity/task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {}
