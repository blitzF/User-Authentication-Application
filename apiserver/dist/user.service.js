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
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schemas/user.schema");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
let UserService = class UserService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async generateJwtToken(user) {
        console.log("Generating JWT...");
        const payload = { email: user.email, name: user.name };
        return this.jwtService.sign(payload, { expiresIn: '3h' });
    }
    async validateUser(email, password) {
        const user = await this.findUser(email);
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (user.email === email && isPasswordValid) {
            const accessToken = await this.generateJwtToken(user);
            return { accessToken, statusCode: 200 };
        }
        else {
            throw new common_1.UnauthorizedException('Invalid credentials!');
        }
    }
    async createUser(body) {
        console.log("Creating a new user...");
        const hashedPassword = await bcrypt.hash(body.password, 10);
        const createdUser = new this.userModel({ name: body.name, email: body.email, password: hashedPassword });
        try {
            await createdUser.save();
        }
        catch (err) {
            throw new common_1.ConflictException('User with this email already exists!');
        }
        const accessToken = await this.generateJwtToken(createdUser);
        return { accessToken, statusCode: 200 };
    }
    async findUser(email) {
        const user = await this.userModel.findOne({ email: email }).exec();
        if (!user) {
            throw new common_1.NotFoundException(`User with email: ${email} not found `);
        }
        return user;
    }
    async listUsers() {
        const users = await this.userModel.find();
        return users;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map