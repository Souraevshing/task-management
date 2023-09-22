import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entity/task.entity';
import { User } from 'src/auth/users/user.entity';
export declare class TasksController {
    private taskService;
    private logger;
    constructor(taskService: TasksService);
    getAllTasks(getTaskDto: GetTaskDto, user: User): Promise<Task[]>;
    addTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>;
    getTaskById(id: string, user: User): Promise<Task>;
    deleteTaskById(id: string, user: User): Promise<void>;
    updateTaskStatus(id: string, updateTaskDto: UpdateTaskDto, user: User): Promise<Task>;
}
