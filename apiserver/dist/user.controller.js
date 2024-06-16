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
exports.ListAllUsers = exports.SignUpController = exports.LogInController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_input_1 = require("./models/user.input");
let LogInController = class LogInController {
    constructor(userService) {
        this.userService = userService;
    }
    async logInUser(body) {
        return await this.userService.validateUser(body.email, body.password);
    }
};
exports.LogInController = LogInController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.LoginInput]),
    __metadata("design:returntype", Promise)
], LogInController.prototype, "logInUser", null);
exports.LogInController = LogInController = __decorate([
    (0, common_1.Controller)('/login'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], LogInController);
let SignUpController = class SignUpController {
    constructor(userService) {
        this.userService = userService;
    }
    signUpUser(body) {
        return this.userService.createUser(body);
    }
};
exports.SignUpController = SignUpController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.CreateUserInput]),
    __metadata("design:returntype", Promise)
], SignUpController.prototype, "signUpUser", null);
exports.SignUpController = SignUpController = __decorate([
    (0, common_1.Controller)('/signup'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], SignUpController);
let ListAllUsers = class ListAllUsers {
    constructor(userService) {
        this.userService = userService;
    }
    listAllUsers() {
        return this.userService.listUsers();
    }
};
exports.ListAllUsers = ListAllUsers;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ListAllUsers.prototype, "listAllUsers", null);
exports.ListAllUsers = ListAllUsers = __decorate([
    (0, common_1.Controller)('/list'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], ListAllUsers);
//# sourceMappingURL=user.controller.js.map