"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const task_model_1 = require("./model/task.model");
const task_repository_1 = require("./repository/task.repository");
const typeorm_1 = require("@nestjs/typeorm");
const task_entity_1 = require("./entity/task.entity");
let TasksService = class TasksService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async getAllTasks(getTaskDto, user) {
        const { status, search } = getTaskDto;
        const query = this.taskRepository.createQueryBuilder('tasks');
        query.where({ user });
        if (status) {
            query.andWhere('tasks.status = :status', { status });
        }
        if (search) {
            query.andWhere('(LOWER(tasks.title) LIKE LOWER(:search) OR LOWER(tasks.description) LIKE LOWER(:search))', { search: `%${search}%` });
        }
        const tasks = await query.getMany();
        return tasks;
    }
    async addTask(createTaskDto, user) {
        const { title, description } = createTaskDto;
        const newTask = this.taskRepository.create({
            title,
            description,
            status: task_model_1.Status.OPEN,
            user,
        });
        await this.taskRepository.save(newTask);
        return newTask;
    }
    async getTaskById(id, user) {
        const isExist1 = await this.taskRepository.findOneBy({ id: id });
        const isExist = await this.taskRepository.findOne({ where: { id, user } });
        if (!isExist) {
            throw new common_1.NotFoundException(`Task not found with id ${id}`);
        }
        return isExist;
    }
    async deleteTaskById(id, user) {
        const deleteTask = await this.taskRepository.delete({ id: id });
        if (deleteTask.affected === 0) {
            throw new common_1.NotFoundException(`Task not found with id ${id}`);
        }
    }
    async updateTaskStatus(id, status, user) {
        const task = await this.getTaskById(id, user);
        task.status = status;
        await this.taskRepository.save(task);
        return task;
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [task_repository_1.TaskRepository])
], TasksService);
//# sourceMappingURL=tasks.service.js.map