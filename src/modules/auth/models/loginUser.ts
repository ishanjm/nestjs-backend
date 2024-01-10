import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now } from 'mongoose';

export type LoginUserDocument = HydratedDocument<LoginUser>;

@Schema({ timestamps: true, collection: 'User' })
export class LoginUser {
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
}

export const UserSchema = SchemaFactory.createForClass(LoginUser);
