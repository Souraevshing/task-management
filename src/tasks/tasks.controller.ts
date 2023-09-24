import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskDto } from './dto/get-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entity/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/users/user.entity';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

// controller with prefix all url as 'api/v1/tasks'
// securing all routes with auth.module.ts

// GetUser() custom decorator is used to fetch current logged in user so that only logged in user will be able to perform CRUD operations
@ApiTags('Tasks')
@Controller('api/v1/tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger();

  constructor(private taskService: TasksService) {}

  // @Query to filter and search tasks based on status or search passed as query inside url
  @ApiOperation({ summary: 'Get all Tasks' })
  @ApiBearerAuth()
  @Get()
  getAllTasks(
    @Query() getTaskDto: GetTaskDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(`User ${user.username}`);
    this.logger.verbose(`GET ALL TASKS \n `);
    return this.taskService.getAllTasks(getTaskDto, user);
  }

  // @Body used to send req body having body as CreateTaskDto
  @ApiOperation({ summary: 'Create Task' })
  @ApiBearerAuth()
  @Post()
  addTask(
    @Body()
    createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(`User ${user.username}`);
    this.logger.verbose('CREATE TASK');
    return this.taskService.addTask(createTaskDto, user);
  }

  // @Param used to send query parameters inside url
  @ApiOperation({ summary: 'Get Task by id' })
  @ApiBearerAuth()
  @Get('/:id')
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    this.logger.verbose(`User ${user.username}`);
    this.logger.verbose('GET TASK BY ID');
    return this.taskService.getTaskById(id, user);
  }

  @ApiOperation({ summary: 'Delete Task' })
  @ApiBearerAuth()
  @Delete('/:id')
  deleteTaskById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(`User ${user.username}`);
    this.logger.verbose('DELETE TASK BY ID');
    return this.taskService.deleteTaskById(id, user);
  }

  @ApiOperation({ summary: 'Update Task' })
  @ApiBearerAuth()
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = updateTaskDto;
    this.logger.verbose(`User ${user.username}`);
    this.logger.verbose(`UPDATE TASK \n `);
    return this.taskService.updateTaskStatus(id, status, user);
  }
}
