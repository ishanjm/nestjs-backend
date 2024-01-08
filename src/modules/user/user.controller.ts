import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { User } from 'src/modules/user/models/user';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from 'src/services/user/user.service';

@ApiBearerAuth()
@ApiTags('User')
@Controller('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, description: 'Success', type: User })
  async create(@Body() CreateUserDto: User): Promise<User> {
    return this.userService.create(CreateUserDto);
  }

  @Get('/getUser/:id')
  @ApiOperation({ summary: 'Get one user' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: User,
  })
  findOne(@Param('id') id: number): User {
    return this.userService.getOne(id);
  }

  @Get('/getAllUsers')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: User,
  })
  @ApiOperation({ summary: 'Get all users' })
  findAll(): Promise<User[]> {
    return this.userService.getAll();
  }
}
