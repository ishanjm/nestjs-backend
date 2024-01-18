import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from './entities/role.entity';

@ApiBearerAuth()
@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('/create')
  async create(@Body() createRoleDto: Role, @Res() response): Promise<Role> {
    try {
      const newRole = await this.roleService.create(createRoleDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Role has been created successfully',
        newRole,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Role not created!',
        error: err.response,
      });
    }
    return;
  }

  @Get('get-all-roles')
  async findAll(@Res() response) {
    try {
      const roles = await this.roleService.findAll();
      return response.status(HttpStatus.OK).json({
        roles,
        message: 'Roles found',
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Internal server error',
        error: err.message,
      });
    }
  }

  @Get('get-role/:id')
  async findOne(@Param('id') id: string, @Res() response) {
    try {
      const role = await this.roleService.findOne(id);
      return response.status(HttpStatus.OK).json({
        role,
        message: 'Role found',
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Internal server error',
        error: err.message,
      });
    }
  }

  @Patch('update-role/:id')
  async update(
    @Param('id') id: string,
    @Body() updateRoleDto: Role,
    @Res() resonse,
  ) {
    try {
      const role = await this.roleService.update(id, updateRoleDto);
      return resonse.status(HttpStatus.OK).json({
        role,
        message: 'Role update',
      });
    } catch (err) {
      return resonse.status(HttpStatus.BAD_REQUEST).json({
        error: err.message,
        message: 'Bad request',
      });
    }
  }

  @Delete('dalete-role/:id')
  async remove(@Param('id') id: string, @Res() response) {
    try {
      const role = await this.roleService.remove(id);
      return response.status(HttpStatus.OK).json({
        role,
        message: 'Role removed',
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_GATEWAY).json({
        error: err.message,
        message: 'Bad request',
      });
    }
  }
}
