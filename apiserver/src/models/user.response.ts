import { PartialType } from '@nestjs/swagger'
import { User } from '../schemas/user.schema';

export class UserResponse extends PartialType(User) {
    createdAt?: string
}