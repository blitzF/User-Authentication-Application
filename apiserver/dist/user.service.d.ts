/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserInput } from './models/user.input';
import { UserResponse } from './models/user.response';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private readonly userModel;
    private jwtService;
    constructor(userModel: Model<User>, jwtService: JwtService);
    generateJwtToken(user: User): Promise<string>;
    validateUser(email: string, password: string): Promise<{
        accessToken: string;
        statusCode: number;
    }>;
    createUser(body: CreateUserInput): Promise<{
        accessToken: string;
        statusCode: number;
    }>;
    findUser(email: string): Promise<User>;
    listUsers(): Promise<UserResponse[]>;
}
