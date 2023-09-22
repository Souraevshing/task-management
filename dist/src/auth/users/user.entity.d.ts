import { Task } from 'src/tasks/entity/task.entity';
export declare class User {
    id: string;
    username: string;
    password: string;
    tasks: Task[];
}
