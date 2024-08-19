import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Role, RoleValues } from '../../common/enums/role.enum';
import toJSON from '../../common/plugins/toJSON.plugin';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  firstName: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  lastName: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    index: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: String,
    trim: true,
    unique: true,
    sparse: true,
  })
  phone?: string;

  @Prop({
    required: true,
    enum: RoleValues,
    default: Role.ADMIN,
  })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.plugin(toJSON);

UserSchema.pre<User>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});
