import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Put,
  Param,
} from '@nestjs/common';
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
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.get(id);
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

  @Delete('/deleteUser/:id')
  @ApiOperation({ summary: 'Delete one user' })
  @ApiResponse({
    status: 200,
    description: 'delete user',
  })
  deleteOne(@Param('id') id: string): Promise<User> {
    return this.userService.delete(id);
  }

  @Put('/updateUser/:id')
  @ApiOperation({ summary: 'Update one user' })
  @ApiResponse({
    status: 200,
    description: 'update user',
    type: User,
  })
  updateOne(@Body() CreateUserDto: User): Promise<User> {
    return this.userService.update(CreateUserDto);
  }
}
