import { Injectable, NotFoundException, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserInput, LoginInput } from './models/user.input';
import { UserResponse } from './models/user.response';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>, private jwtService: JwtService) {}

    async generateJwtToken(user: User): Promise<string> {
        console.log("Generating JWT...");
        const payload = { email: user.email, name: user.name };
        return this.jwtService.sign(payload, { expiresIn: '3h' });
    }

    async validateUser(email: string, password: string): Promise<{ accessToken: string, statusCode: number }> {
        const user: User = await this.findUser(email);
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (user.email === email && isPasswordValid) {
            const accessToken = await this.generateJwtToken(user);
            return { accessToken, statusCode: 200 };
        }else{
            throw new UnauthorizedException('Invalid credentials!');
        }
    }

    async createUser(body: CreateUserInput): Promise<{ accessToken: string, statusCode: number }> {
        console.log("Creating a new user...");
        const hashedPassword = await bcrypt.hash(body.password, 10);
        const createdUser = new this.userModel({name: body.name, email: body.email, password: hashedPassword});
        try{
            await createdUser.save();
        }catch(err){
            throw new ConflictException ('User with this email already exists!')
        }
        
        const accessToken = await this.generateJwtToken(createdUser);
        return { accessToken, statusCode: 200 };
    }

    async findUser(email: string): Promise<User> {
        const user = await this.userModel.findOne({ email: email }).exec();
    
        if (!user) {
          throw new NotFoundException(`User with email: ${email} not found `);
        }
        return user;
    }

    async listUsers(): Promise<UserResponse[]> {
        const users = await this.userModel.find();
        return users;
    }
}
