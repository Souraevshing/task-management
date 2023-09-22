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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("./users/user.entity");
const user_repository_1 = require("./users/user.repository");
let AuthService = class AuthService {
    constructor(usersRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger();
    }
    async signUpUser(authCredentialsDto) {
        const { username, password } = authCredentialsDto;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.usersRepository.create({
            username,
            password: hashedPassword,
        });
        try {
            await this.usersRepository.save(user);
        }
        catch (error) {
            this.logger.error(error);
            if (error.code === '23505') {
                throw new common_1.ConflictException('Username already exists');
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async signInUser(authCredentialsDto) {
        const { username, password } = authCredentialsDto;
        const user = await this.usersRepository.findOne({
            where: { username: username },
        });
        if (user && (await bcrypt.compare(password, user.password))) {
            const payload = { username };
            const accessToken = await this.jwtService.sign(payload);
            return { accessToken };
        }
        else {
            throw new common_1.UnauthorizedException('User not found');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [user_repository_1.UsersRepository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map