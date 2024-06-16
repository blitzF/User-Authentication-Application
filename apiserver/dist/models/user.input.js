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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginInput = exports.CreateUserInput = void 0;
const class_validator_1 = require("class-validator");
class CreateUserInput {
}
exports.CreateUserInput = CreateUserInput;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateUserInput.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserInput.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8, { message: 'Password must be at least 8 characters long.' }),
    (0, class_validator_1.Matches)(/(?=.*[a-zA-Z])/, { message: 'Password must contain at least one letter.' }),
    (0, class_validator_1.Matches)(/(?=.*\d)/, { message: 'Password must contain at least one number.' }),
    (0, class_validator_1.Matches)(/(?=.*[!@#$%^&*])/, { message: 'Password must contain at least one special character.' }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "password", void 0);
class LoginInput {
}
exports.LoginInput = LoginInput;
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], LoginInput.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Password must be a string.' }),
    (0, class_validator_1.MinLength)(8, { message: 'Password must be at least 8 characters long.' }),
    (0, class_validator_1.Matches)(/(?=.*[a-zA-Z])/, { message: 'Password must contain at least one letter.' }),
    (0, class_validator_1.Matches)(/(?=.*\d)/, { message: 'Password must contain at least one number.' }),
    (0, class_validator_1.Matches)(/(?=.*[!@#$%^&*])/, { message: 'Password must contain at least one special character.' }),
    __metadata("design:type", String)
], LoginInput.prototype, "password", void 0);
//# sourceMappingURL=user.input.js.map