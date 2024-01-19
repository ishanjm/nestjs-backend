import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now } from 'mongoose';

@Schema({ timestamps: true, collection: 'Role' })
export class Role {
  @Prop({ required: true })
  @ApiProperty({ example: 'Admin', description: 'Name of role' })
  name: string;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
RoleSchema.virtual('Users', {
  ref: 'User',
  localField: '_id',
  foreignField: 'role',
});
