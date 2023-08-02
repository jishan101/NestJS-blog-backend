import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { isEmail } from 'class-validator';
import { Model } from 'mongoose';
import { RoleService } from '../role/role.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly roleService: RoleService,
  ) {}

  public getAllUsers() {
    return this.userModel.find().select('-password');
  }

  private generateHashPassword(password: string) {
    return bcrypt.hash(password, 10);
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
}
