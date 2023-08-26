import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'blogs' })
export class Blog extends Document {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: String })
  content: string;

  @Prop({ required: true, type: String })
  imageUrl: string;

  @Prop({ type: [String] })
  categories: string[];

  @Prop({ required: true, type: String })
  author: string;

  @Prop({ required: true, type: String })
  createdBy: string;

  @Prop()
  updatedBy: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
