import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Status } from '../model/task.model';

export class GetTaskDto {
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  @IsString()
  search?: string;
}
