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

  async get(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async delete(id: string): Promise<any> {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async update(createUserDto: CreateUserDto): Promise<User> {
    const filter = { age: 100 };
    const update = { age: 59 };

    // `doc` is the document _after_ `update` was applied because of
    // `new: true`
    const doc = await this.userModel.findOneAndUpdate(filter, update, {
      new: true,
    });
    doc.firstName; // 'Jean-Luc Picard'
    doc.age; // 59
    return doc;
  }
}
