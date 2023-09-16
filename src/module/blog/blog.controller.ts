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
import { BlogService } from './blog.service';
import { BlogResponseDTO } from './dto/blog-response.dto';
import { BlogWithTotalResponseDTO } from './dto/blog-with-total-response.dto';
import { CreateBlogDTO } from './dto/create-blog.dto';
import { UpdateBlogDTO } from './dto/update-blog.dto';

@ApiTags('Blog APIs')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: BlogResponseDTO, isArray: true })
  @Get('all')
  public getAllBlogs() {
    return this.blogService.getAllBlogs();
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: BlogWithTotalResponseDTO })
  @Get('get-by-page/:page/:limit')
  public getByPageNo(
    @Param('page') page: string,
    @Param('limit') limit: string,
  ) {
    return this.blogService.getByPageAndLimit(page, limit);
  }

  @ApiGuard()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: BlogResponseDTO, isArray: true })
  @Get('author/:authorId')
  public getBlogsByAuthorId(@Param('authorId') authorId: string) {
    return this.blogService.getBlogsByAuthorId(authorId);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: BlogResponseDTO, isArray: true })
  @Get('category/:category')
  public getBlogsByCategory(@Param('category') category: string) {
    return this.blogService.getBlogsByCategory(category);
  }

  @ApiGuard()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: BlogResponseDTO })
  @Post('create')
  public createBlog(
    @Body() body: CreateBlogDTO,
    @CurrentUser() authUser: UserPayload,
  ) {
    return this.blogService.createBlog(body, authUser);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: BlogResponseDTO })
  @Get('details/:id')
  public getBlogById(@Param('id') id: string) {
    return this.blogService.getBlogById(id);
  }

  @ApiGuard()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UpdateResponseDTO })
  @Patch('Update/:id')
  public updateBlog(
    @Param('id') id: string,
    @Body() body: UpdateBlogDTO,
    @CurrentUser() authUser: UserPayload,
  ) {
    return this.blogService.updateBlog(id, body, authUser);
  }

  @ApiGuard()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: DeleteResponseDTO })
  @Delete('delete/:id')
  public deleteBlog(@Param('id') id: string) {
    return this.blogService.deleteBlog(id);
  }
}
