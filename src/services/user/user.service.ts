import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/modules/user/models/user';
import { CreateUserDto, UpdateUserDto } from '../../modules/user/dto/index';
import { IUser } from '../../modules/user/dto/IUser';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  constructor(@InjectModel(User.name) private userModel: Model<IUser>) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const createUser = new this.userModel(createUserDto);
    return createUser.save();
  }

  async getAll(): Promise<IUser[]> {
    return this.userModel.find().exec();
  }

  async get(id: string): Promise<IUser> {
    const existingUser = await this.userModel.findById(id).exec();
    if (!existingUser) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return existingUser;
  }

  async delete(id: string): Promise<any> {
    const existingUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!existingUser) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return existingUser;
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const existingUser = await this.userModel.findByIdAndUpdate(
      userId,
      updateUserDto,
      {
        new: true,
      },
    );
    if (!existingUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return existingUser;
  }
}
