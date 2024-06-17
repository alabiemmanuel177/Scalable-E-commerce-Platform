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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const role_entity_1 = require("./entities/role.entity");
const user_profile_entity_1 = require("./entities/user-profile.entity");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(userRepository, roleRepository, userProfileRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.userProfileRepository = userProfileRepository;
    }
    async findById(id) {
        return this.userRepository.findOne({
            where: { id },
            relations: ['profile'],
        });
    }
    async findByEmail(email) {
        return this.userRepository.findOne({ where: { email } });
    }
    async create(createUserDto) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
        const user = this.userRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });
        return this.userRepository.save(user);
    }
    async update(id, updateUserDto) {
        await this.userRepository.update(id, updateUserDto);
        return this.findById(id);
    }
    async validateUser(email, password) {
        const user = await this.findByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }
        return null;
    }
    async createOAuthUser(profile) {
        const user = this.userRepository.create({
            username: profile.displayName,
            email: profile.emails[0].value,
            password: '',
        });
        return this.userRepository.save(user);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __param(2, (0, typeorm_1.InjectRepository)(user_profile_entity_1.UserProfile)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map