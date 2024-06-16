import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserInput, LoginInput } from './models/user.input'


@Controller('/login')
export class LogInController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async logInUser(@Body() body: LoginInput) : Promise<{ accessToken: string, statusCode: number }> {
        return await this.userService.validateUser(body.email, body.password);
    }
}

@Controller('/signup')
export class SignUpController {
    constructor(private readonly userService: UserService) {}

    @Post()
    signUpUser(@Body() body: CreateUserInput) : Promise<{ accessToken: string, statusCode: number }> {
        return this.userService.createUser(body);
    } 
}

@Controller('/list')
export class ListAllUsers {
    constructor(private readonly userService: UserService) {}

    @Get()
    listAllUsers() {
        return this.userService.listUsers();
    }
}