import { Document, Types } from 'mongoose';
export interface IUser extends Document {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly age: number;
  readonly role: Types.ObjectId;
  readonly refreshToken: string;
  readonly password: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
