import { IsInt, IsString, IsEmail, IsDate, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsInt()
  @IsNotEmpty()
  readonly age: number;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly role: Types.ObjectId;

  @IsString()
  readonly refreshToken: string;

  @IsDate()
  readonly createdAt: Date;

  @IsDate()
  readonly updatedAt: Date;
}
