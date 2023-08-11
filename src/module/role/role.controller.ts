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
import { UpdateResponseDTO } from '../shared/dto';
import { CreateRoleDTO } from './dto/create-role.dto';
import { RoleResponseDTO } from './dto/role-response.dto';
import { UpdateRoleDTO } from './dto/update-role.dto';
import { RoleService } from './role.service';

@ApiTags('Role APIs')
@Controller('role')
@ApiGuard()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: RoleResponseDTO, isArray: true })
  @Get('all')
  public getAllRoles() {
    return this.roleService.getAllRoles();
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: RoleResponseDTO })
  @Post('create')
  public createRole(
    @Body() body: CreateRoleDTO,
    @CurrentUser() authUser: UserPayload,
  ) {
    return this.roleService.createRole(body, authUser);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: RoleResponseDTO })
  @Get('details/:id')
  public getRoleById(@Param('id') id: string) {
    return this.roleService.getRoleById(id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UpdateResponseDTO })
  @Patch('Update/:id')
  public updateRole(
    @Param('id') id: string,
    @Body() body: UpdateRoleDTO,
    @CurrentUser() authUser: UserPayload,
  ) {
    return this.roleService.updateRole(id, body, authUser);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UpdateResponseDTO })
  @Delete('delete/:id')
  public deleteRole(@Param('id') id: string) {
    return this.roleService.deleteRole(id);
  }
}
