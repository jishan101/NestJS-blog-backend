import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema } from 'mongoose';
import { UserPayload } from '../auth/user-payload';
import { ResponseHelper } from '../shared/util';
import { isSameString } from '../shared/util/is-same-string.util';
import { CreateBlogDTO } from './dto/create-blog.dto';
import { UpdateBlogDTO } from './dto/update-blog.dto';
import { Blog } from './schema/blog.schema';

@Injectable()
export class BlogService {
  constructor(
    @InjectModel(Blog.name)
    private readonly blogModel: Model<Blog>,
  ) {}

  public getAllBlogs() {
    return this.blogModel.find();
  }

  public getBlogsByAuthorId(authorId: string | Schema.Types.ObjectId) {
    return this.blogModel.find({ createdBy: authorId });
  }

  public async getBlogsByCategory(category: string) {
    const blogs = await this.getAllBlogs();
    return blogs.length
      ? blogs.filter((blog) => blog?.categories?.includes(category))
      : [];
  }

  public async getBlogById(id: string | Schema.Types.ObjectId) {
    const blog = await this.blogModel.findById(id);
    if (!blog) {
      throw new NotFoundException(`Blog does not exist.`);
    }

    return blog;
  }

  private findByTitle(title: string) {
    return this.blogModel.findOne({ title });
  }

  private async canAddBlog(title: string) {
    const existingBlog = await this.findByTitle(title);
    if (existingBlog) {
      throw new BadRequestException(`Title = ${title} already exists.`);
    }

    return true;
  }

  public async createBlog(body: CreateBlogDTO, authUser: UserPayload) {
    await this.canAddBlog(body.title);

    body.author = `${authUser?.firstName} ${authUser?.lastName}`;
    body.createdBy = String(authUser?.userId);
    const newBlog = new this.blogModel(body);
    return await newBlog.save();
  }

  private async canUpdateBlog(
    id: string | Schema.Types.ObjectId,
    body: UpdateBlogDTO,
  ) {
    const existingBlog = await this.getBlogById(id);

    if (body?.title) {
      const isTitleSame = isSameString(existingBlog.title, body?.title);
      if (!isTitleSame) {
        await this.canAddBlog(body?.title);
      }
    }

    return true;
  }

  public async updateBlog(
    id: string | Schema.Types.ObjectId,
    body: UpdateBlogDTO,
    authUser: UserPayload,
  ) {
    await this.canUpdateBlog(id, body);

    body.updatedBy = authUser?.userId;
    const updatedRole = await this.blogModel.findByIdAndUpdate(id, body);

    return ResponseHelper.updateResponse(updatedRole ? true : false, id);
  }

  public async deleteBlog(id: string | Schema.Types.ObjectId) {
    await this.getBlogById(id);

    const deletedRole = await this.blogModel.findByIdAndDelete(id);

    return ResponseHelper.deleteResponse(deletedRole ? true : false);
  }
}
