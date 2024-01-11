import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Put,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { User } from 'src/modules/user/models/user';
import { CreateUserDto, UpdateUserDto } from './dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from 'src/modules/user/user.service';
import * as bcrypt from 'bcrypt';
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
@ApiBearerAuth()
@ApiTags('User')
@Controller('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @Public()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, description: 'Success', type: User })
  async create(@Body() CreateUserDto: User, @Res() response): Promise<User> {
    try {
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(CreateUserDto.password, saltOrRounds);
      CreateUserDto.password = hash;
      const newUser = await this.userService.create(CreateUserDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'User has been created successfully',
        newUser,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User not created!',
        error: err.response,
      });
    }
  }

  @Get('/getUser/:id')
  @ApiOperation({ summary: 'Get one user' })
  async findOne(@Res() response, @Param('id') id: string): Promise<User> {
    try {
      const existingUser = await this.userService.get(id);
      return response.status(HttpStatus.OK).json({
        message: 'User found successfully',
        existingUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/getAllUsers')
  @ApiOperation({ summary: 'Get all users' })
  async findAll(@Res() response): Promise<User[]> {
    try {
      const userData = await this.userService.getAll();
      return response.status(HttpStatus.OK).json({
        message: 'All User data found successfully',
        userData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/deleteUser/:id')
  @ApiOperation({ summary: 'Delete one user' })
  async deleteOne(@Param('id') id: string, @Res() response): Promise<User> {
    try {
      const deletedUser = await this.userService.delete(id);
      return response.status(HttpStatus.OK).json({
        message: 'User deleted successfully',
        deletedUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Put('/updateUser/:id')
  @ApiOperation({ summary: 'Update one user' })
  async updateOne(
    @Res() response,
    @Param('id') id: string,
    @Body() UpdateUserDto: User,
  ): Promise<User> {
    try {
      const existingUser = await this.userService.update(id, UpdateUserDto);
      return response.status(HttpStatus.OK).json({
        message: 'Update has been successfully updated',
        existingUser,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
