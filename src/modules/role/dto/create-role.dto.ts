import { IsString, IsNotEmpty, IsDate } from 'class-validator';
export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  readonly name;

  @IsDate()
  readonly createdAt: Date;

  @IsDate()
  readonly updatedAt: Date;
}
