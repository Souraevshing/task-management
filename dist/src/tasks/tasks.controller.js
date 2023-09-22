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
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
const create_task_dto_1 = require("./dto/create-task.dto");
const get_task_dto_1 = require("./dto/get-task.dto");
const update_task_dto_1 = require("./dto/update-task.dto");
const passport_1 = require("@nestjs/passport");
const get_user_decorator_1 = require("../auth/decorators/get-user.decorator");
const user_entity_1 = require("../auth/users/user.entity");
let TasksController = class TasksController {
    constructor(taskService) {
        this.taskService = taskService;
        this.logger = new common_1.Logger();
    }
    getAllTasks(getTaskDto, user) {
        this.logger.verbose(`User ${user.username}`);
        this.logger.verbose(`GET ALL TASKS \n `);
        return this.taskService.getAllTasks(getTaskDto, user);
    }
    addTask(createTaskDto, user) {
        this.logger.verbose(`User ${user.username}`);
        this.logger.verbose('CREATE TASK');
        return this.taskService.addTask(createTaskDto, user);
    }
    getTaskById(id, user) {
        this.logger.verbose(`User ${user.username}`);
        this.logger.verbose('GET TASK BY ID');
        return this.taskService.getTaskById(id, user);
    }
    deleteTaskById(id, user) {
        this.logger.verbose(`User ${user.username}`);
        this.logger.verbose('DELETE TASK BY ID');
        return this.taskService.deleteTaskById(id, user);
    }
    updateTaskStatus(id, updateTaskDto, user) {
        const { status } = updateTaskDto;
        this.logger.verbose(`User ${user.username}`);
        this.logger.verbose(`UPDATE TASK \n `);
        return this.taskService.updateTaskStatus(id, status, user);
    }
};
exports.TasksController = TasksController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_task_dto_1.GetTaskDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getAllTasks", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "addTask", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getTaskById", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "deleteTaskById", null);
__decorate([
    (0, common_1.Patch)('/:id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_task_dto_1.UpdateTaskDto,
        user_entity_1.User]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "updateTaskStatus", null);
exports.TasksController = TasksController = __decorate([
    (0, common_1.Controller)('api/v1/tasks'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksController);
//# sourceMappingURL=tasks.controller.js.map