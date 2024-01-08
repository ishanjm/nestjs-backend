import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  @ApiProperty({ example: 'Jhone', description: 'The last name of the user' })
  firstName: string;

  @Prop({ required: true })
  @ApiProperty({ example: 1, description: 'The age of the user' })
  age: number;

  @Prop({ required: true })
  @ApiProperty({
    example: 'Cena',
    description: 'Last name of the user',
  })
  lastName: string;

  @Prop({ required: true })
  @ApiProperty({
    example: 'user@domain.com',
    description: 'Email of the user',
  })
  email: string;

  @Prop({ required: true, unique: true })
  @ApiProperty({
    description: 'Password of users',
  })
  password: string;

  @Prop({ required: false })
  @ApiProperty({
    description: 'Role Id',
  })
  role: string;

  @Prop({ default: '' })
  @ApiProperty({
    description: 'Refresh Token',
  })
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
