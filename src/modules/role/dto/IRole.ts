import { Document } from 'mongoose';
export interface IRole extends Document {
  readonly name;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
