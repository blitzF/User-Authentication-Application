import { User } from '../schemas/user.schema';
declare const UserResponse_base: import("@nestjs/common").Type<Partial<User>>;
export declare class UserResponse extends UserResponse_base {
    createdAt?: string;
}
export {};
