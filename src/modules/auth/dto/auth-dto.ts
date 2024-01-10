import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
export class AuthUserDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
