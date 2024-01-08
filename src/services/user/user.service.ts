import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/user/models/user';
import { CreateUserDto } from '../../modules/user/dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createUser = new this.userModel(createUserDto);
    return createUser.save();
  }

  async getAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  getOne(id: number): User {
    return new User();
  }
}
