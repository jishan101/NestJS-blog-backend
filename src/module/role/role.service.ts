import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { UserPayload } from '../auth/user-payload';
import { ResponseHelper } from '../shared/util';
import { CreateRoleDTO } from './dto/create-role.dto';
import { UpdateRoleDTO } from './dto/update-role.dto';
import { Role } from './schema/role.schema';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name)
    private readonly roleModel: Model<Role>,
  ) {}

  public getAllRoles() {
    return this.roleModel.find();
  }

  public async getRoleById(id: string | Schema.Types.ObjectId) {
    const role = await this.roleModel.findById(id);
    if (!role) {
      throw new NotFoundException(`Role does not exist.`);
    }

    return role;
  }

  public findByShortForm(shortForm: string) {
    return this.roleModel.findOne({ shortForm });
  }

  private async canAddRole(body: CreateRoleDTO) {
    const role = await this.findByShortForm(body.shortForm);
    if (role) {
      throw new BadRequestException(
        `Short form = ${role.shortForm} already exists.`,
      );
    }
    return true;
  }

  public async createRole(body: CreateRoleDTO, authUser: UserPayload) {
    await this.canAddRole(body);
    body.createdBy = String(authUser?.userId);
    const newRole = new this.roleModel(body);
    return await newRole.save();
  }

  public async updateRole(
    id: string | Schema.Types.ObjectId,
    body: UpdateRoleDTO,
    authUser: UserPayload,
  ) {
    await this.getRoleById(id);

    body.updatedBy = authUser?.userId;
    const updatedRole = await this.roleModel.findByIdAndUpdate(id, body);

    return ResponseHelper.updateResponse(updatedRole ? true : false, id);
  }

  public async deleteRole(id: string | Schema.Types.ObjectId) {
    await this.getRoleById(id);

    const deletedRole = await this.roleModel.findByIdAndDelete(id);

    return ResponseHelper.deleteResponse(deletedRole ? true : false);
  }
}
