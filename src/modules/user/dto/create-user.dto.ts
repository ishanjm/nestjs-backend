import { IsInt, IsString, IsEmail } from 'class-validator';
export class CreateUserDto {
  @IsString()
  readonly firstName: string;
  @IsString()
  readonly lastName: string;
  @IsInt()
  readonly age: number;
  @IsEmail()
  readonly email: string;
  @IsString()
  readonly password: string;
  @IsString()
  readonly role: string;
  @IsString()
  readonly refreshToken: string;
}
