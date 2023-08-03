import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { isEmail } from 'class-validator';
import { Model, Schema } from 'mongoose';
import { UserPayload } from '../auth/user-payload';
import { RoleService } from '../role/role.service';
import { ResponseHelper } from '../shared/util';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly roleService: RoleService,
  ) {}

  private generateHashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  public async comparePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  public getAllUsers() {
    return this.userModel.find().select('-password');
  }

  public async getUserById(id: string | Schema.Types.ObjectId) {
    const user = await this.userModel.findById(id).select('-password');
    if (!user) {
      throw new BadRequestException(`User does not exist.`);
    }

    return user;
  }

  public async findByIdWithPassword(id: string | Schema.Types.ObjectId) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`User does not exist.`);
    }

    return user;
  }

  private findByEmailAndUsername(email: string, username: string) {
    return this.userModel.findOne({ email, username }).exec();
  }

  public findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  public findByUsername(username: string) {
    return this.userModel.findOne({ username }).exec();
  }

  public async setRoleInfo(user: User) {
    const userRole = await this.roleService.getRoleById(user.roleId);
    return Object.assign(user, {
      role: {
        roleId: userRole?.id ? userRole?.id : null,
        roleName: userRole?.name ? userRole?.name : null,
        shortForm: userRole?.shortForm ? userRole?.shortForm : null,
      },
    });
  }

  public async findByCredentials(credential: string) {
    const user = isEmail(credential)
      ? await this.findByEmail(credential)
      : await this.findByUsername(credential);
    if (user && user.roleId) {
      return this.setRoleInfo(user);
    }
    return null;
  }

  public async createUser(body: CreateUserDTO) {
    const userByEmailAndUsername = await this.findByEmailAndUsername(
      body.email,
      body.username,
    );
    if (userByEmailAndUsername) {
      throw new BadRequestException(
        `Email: '${body.email}' & Username: '${body.username}' already exists. Please enter new email & username.`,
      );
    }

    const userByEmail = await this.findByEmail(body.email);
    if (userByEmail) {
      throw new BadRequestException(
        `Email: '${body.email}' already exists. Please enter a new email.`,
      );
    }

    const userByUsername = await this.findByUsername(body.username);
    if (userByUsername) {
      throw new BadRequestException(
        `Username: '${body.username} 'already exists. Please enter a new username.`,
      );
    }

    body.password = await this.generateHashPassword(body.password);

    const newUser = new this.userModel(body);
    return await newUser.save();
  }

  private async isNewPasswordValid(
    body: UpdateUserDTO,
    existingUser: User,
  ): Promise<boolean> {
    if (body.newPassword === body.oldPassword) {
      throw new BadRequestException(
        `You can't use your old password as new password.`,
      );
    }

    const isOldPasswordValid = await this.comparePassword(
      body.oldPassword,
      existingUser.password,
    );
    if (!isOldPasswordValid) {
      throw new BadRequestException(`You have entered wrong old password.`);
    }

    return true;
  }

  public async updateUser(
    id: string | Schema.Types.ObjectId,
    body: UpdateUserDTO,
    authUser: UserPayload,
  ) {
    const existingUser = await this.findByIdWithPassword(id);

    if (body.newPassword && body.oldPassword) {
      await this.isNewPasswordValid(body, existingUser);
      body.password = await this.generateHashPassword(body.newPassword);
    }

    body.updatedBy = authUser?.userId;
    const updatedUser = await this.userModel.findByIdAndUpdate(id, body);

    return ResponseHelper.updateResponse(updatedUser ? true : false, id);
  }

  public async deleteUser(id: string | Schema.Types.ObjectId) {
    await this.findByIdWithPassword(id);

    const deletedUser = await this.userModel.findByIdAndDelete(id);

    return ResponseHelper.deleteResponse(deletedUser ? true : false);
  }
}
