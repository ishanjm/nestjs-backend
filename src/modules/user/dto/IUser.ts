import { Document } from 'mongoose';
export interface IUser extends Document {
  readonly firstName: string;
  readonly lastName: string;
  readonly age: number;
  readonly role: string;
  readonly refreshToken: string;
  readonly password: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
