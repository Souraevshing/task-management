import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './entity/task.entity';
import { AuthModule } from '../auth/auth.module';

// passing TypeOrmModule.forFeature and passing entity name inside array, to use this entity to use repository methods
// since orm metadata are already set at root level, therefore we will be able to use Task entity to implement CRUD operations
@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule, ConfigModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
