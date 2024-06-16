import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

export class CreateUserInput {
  @IsString()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  @Matches(/(?=.*[a-zA-Z])/, { message: 'Password must contain at least one letter.' })
  @Matches(/(?=.*\d)/, { message: 'Password must contain at least one number.' })
  @Matches(/(?=.*[!@#$%^&*])/, { message: 'Password must contain at least one special character.' })
  readonly password: string;
}

export class LoginInput {
  @IsEmail()
  readonly email: string;

  @IsString({ message: 'Password must be a string.' })
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  @Matches(/(?=.*[a-zA-Z])/, { message: 'Password must contain at least one letter.' })
  @Matches(/(?=.*\d)/, { message: 'Password must contain at least one number.' })
  @Matches(/(?=.*[!@#$%^&*])/, { message: 'Password must contain at least one special character.' })
  readonly password: string;
}
