import { Status } from './model/task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { TaskRepository } from './repository/task.repository';
import { Task } from './entity/task.entity';
import { User } from 'src/auth/users/user.entity';
export declare class TasksService {
    private taskRepository;
    constructor(taskRepository: TaskRepository);
    getAllTasks(getTaskDto: GetTaskDto, user: User): Promise<Task[]>;
    addTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>;
    getTaskById(id: string, user: User): Promise<Task>;
    deleteTaskById(id: string, user: User): Promise<void>;
    updateTaskStatus(id: string, status: Status, user: User): Promise<Task>;
}
