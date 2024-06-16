import { UserService } from './user.service';
import { CreateUserInput, LoginInput } from './models/user.input';
export declare class LogInController {
    private readonly userService;
    constructor(userService: UserService);
    logInUser(body: LoginInput): Promise<{
        accessToken: string;
        statusCode: number;
    }>;
}
export declare class SignUpController {
    private readonly userService;
    constructor(userService: UserService);
    signUpUser(body: CreateUserInput): Promise<{
        accessToken: string;
        statusCode: number;
    }>;
}
export declare class ListAllUsers {
    private readonly userService;
    constructor(userService: UserService);
    listAllUsers(): Promise<import("./models/user.response").UserResponse[]>;
}
