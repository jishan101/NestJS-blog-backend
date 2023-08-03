import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginResponseDTO } from './dto/login-response.dto';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(credentials: LoginDTO) {
    const user = await this.userService.findByCredentials(credentials.username);
    if (!user) {
      throw new BadRequestException('Wrong email or username.');
    }

    if (!user.isApproved) {
      throw new BadRequestException('Not approved by admin yet.');
    }

    if (!user?.isActive) {
      throw new BadRequestException('Requested user is inactive.');
    }

    const isPasswordValid = await this.userService.comparePassword(
      credentials.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Password is incorrect.');
    }
    return user;
  }

  public async login(credentials: LoginDTO): Promise<LoginResponseDTO> {
    const validUser = await this.validateUser(credentials);
    if (!validUser) {
      throw new BadRequestException('Invalid credentials.');
    }
    delete validUser.password;

    const payload = {
      sub: validUser.id,
      userId: validUser.id,
      username: validUser.username,
      email: validUser.email,
      firstName: validUser.firstName,
      lastName: validUser.lastName,
      role: validUser.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
