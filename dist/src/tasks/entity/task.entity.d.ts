import { Status } from '../model/task.model';
import { User } from 'src/auth/users/user.entity';
export declare class Task {
    id: string;
    title: string;
    description: string;
    status: Status;
    user: User;
}
