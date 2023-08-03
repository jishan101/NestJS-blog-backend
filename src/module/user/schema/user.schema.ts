import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'users' })
export class User extends Document {
  @Prop({ required: true, unique: true, type: String })
  email: string;

  @Prop({ required: true, unique: true, type: String })
  username: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  roleId: string;

  @Prop({ default: false })
  isApproved: boolean;

  @Prop()
  createdBy: string;

  @Prop()
  updatedBy: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
