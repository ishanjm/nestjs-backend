import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/modules/user/models/user';
import { CreateUserDto, UpdateUserDto } from './dto/index';
import { IUser } from './dto/IUser';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  constructor(
    @InjectModel(User.name) private userModel: Model<IUser>,
    private jwtService: JwtService,
  ) {}

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

  async findOne(username: string, password: string) {
    if (!username || !password)
      throw new NotFoundException(`User #${username} not found`);
    const user = await this.userModel.findOne({ email: username });
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const payload = { sub: user._id, username: user.firstName };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
    } else throw new UnauthorizedException();
  }
}
