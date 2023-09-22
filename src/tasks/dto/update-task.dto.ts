import { IsEnum } from 'class-validator';
import { Status } from '../model/task.model';

// validation for update controller, the status can only contain the enum Status
export class UpdateTaskDto {
  @IsEnum(Status)
  status: Status;
}
