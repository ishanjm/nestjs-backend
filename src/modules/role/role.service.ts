import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './entities/role.entity';
import { Model } from 'mongoose';
import { IRole } from './dto/IRole';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<IRole>) {}
  create(createRoleDto: CreateRoleDto): Promise<IRole> {
    const createdRole = new this.roleModel(createRoleDto);
    return createdRole.save();
  }

  async findAll(): Promise<IRole[]> {
    return this.roleModel.find().exec();
  }

  async findOne(id: string): Promise<IRole> {
    const existingRole = await this.roleModel.findById(id).exec();
    if (!existingRole) {
      throw new NotFoundException(`Role #${id} not found`);
    }
    return existingRole;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<IRole> {
    const existingRole = await this.roleModel.findByIdAndUpdate(
      id,
      updateRoleDto,
      {
        new: true,
      },
    );
    if (!existingRole) {
      throw new NotFoundException(`Role #${id} not found`);
    }
    return existingRole;
  }

  async remove(id: string) {
    const existingRole = await this.roleModel.findByIdAndDelete(id).exec();
    if (!existingRole) {
      throw new NotFoundException(`Role #${id} not found`);
    }
    return existingRole;
  }
}
