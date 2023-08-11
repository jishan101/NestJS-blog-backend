import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiGuard, CurrentUser } from '../../decorator';
import { UserPayload } from '../auth/user-payload';
import { DeleteResponseDTO, UpdateResponseDTO } from '../shared/dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserResponseDTO } from './dto/user-response.dto';
import { UserService } from './user.service';

@ApiTags('User APIs')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiGuard()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserResponseDTO, isArray: true })
  @Get('all')
  public getAllUsers() {
    return this.userService.getAllUsers();
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserResponseDTO })
  @Post('create')
  public createUser(@Body() body: CreateUserDTO) {
    return this.userService.createUser(body);
  }

  @ApiGuard()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserResponseDTO })
  @Get('details/:id')
  public getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @ApiGuard()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UpdateResponseDTO })
  @Patch('update/:id')
  public updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDTO,
    @CurrentUser() authUser: UserPayload,
  ) {
    return this.userService.updateUser(id, body, authUser);
  }

  @ApiGuard()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: DeleteResponseDTO })
  @Delete('delete/:id')
  public deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
