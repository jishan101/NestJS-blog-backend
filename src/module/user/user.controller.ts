import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserResponseDTO } from './dto/user-response.dto';
import { UserService } from './user.service';
import { ApiGuard } from 'src/decorator';

@ApiTags('User APIs')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiGuard()
  @ApiOkResponse({ type: UserResponseDTO, isArray: true })
  @HttpCode(HttpStatus.OK)
  @Get('all')
  public getAllUsers() {
    return this.userService.getAllUsers();
  }

  @ApiOkResponse({ type: UserResponseDTO })
  @HttpCode(HttpStatus.OK)
  @Post('create')
  public createUser(@Body() body: CreateUserDTO) {
    return this.userService.createUser(body);
  }
}
