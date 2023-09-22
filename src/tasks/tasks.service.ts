import { Injectable, NotFoundException } from '@nestjs/common';

import { Status } from './model/task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { TaskRepository } from './repository/task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entity/task.entity';
import { User } from 'src/auth/users/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: TaskRepository,
  ) {}

  async getAllTasks(getTaskDto: GetTaskDto, user: User): Promise<Task[]> {
    // destructuring status and search from dto to filter tasks
    const { status, search } = getTaskDto;

    // creating query and passing table name 'tasks'
    const query = this.taskRepository.createQueryBuilder('tasks');

    // find user logged in and if and only if current user is logged in then only get all tasks
    query.where({ user });

    // filtering based on status
    // equivalent SQL statement will be : SELECT * FROM tasks task WHERE task.status = ${status}
    if (status) {
      query.andWhere('tasks.status = :status', { status });
    }

    // filtering based on search
    // equivalent SQL statement will be : SELECT * FROM tasks task WHERE task.title=${title} OR task.description=${description}
    if (search) {
      query.andWhere(
        '(LOWER(tasks.title) LIKE LOWER(:search) OR LOWER(tasks.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }

  // passing current user logged in along with tasks
  async addTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const newTask = this.taskRepository.create({
      title,
      description,
      status: Status.OPEN,
      user,
    });
    await this.taskRepository.save(newTask); // saving newTask inside db
    return newTask; // returning newTask object as response to client
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const isExist1 = await this.taskRepository.findOneBy({ id: id });
    const isExist = await this.taskRepository.findOne({ where: { id, user } });

    // if task doesn't exist, throws exception with custom message and status as 404 not found
    if (!isExist) {
      throw new NotFoundException(`Task not found with id ${id}`);
    }

    return isExist;
  }

  async deleteTaskById(id: string, user: User): Promise<void> {
    const deleteTask = await this.taskRepository.delete({ id: id });
    if (deleteTask.affected === 0) {
      throw new NotFoundException(`Task not found with id ${id}`);
    }
  }

  async updateTaskStatus(
    id: string,
    status: Status,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }
}
