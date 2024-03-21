import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateQuery } from 'mongoose';
import { compare } from 'bcrypt';
import { User } from './schema/user.schema';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Account } from '../common/interfaces/account.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  getUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async getUserById(userId: string): Promise<{ user: Partial<User> }> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
    };
  }

  async updateUser(
    userId: string,
    update: UpdateQuery<User>,
  ): Promise<{ user: Partial<User> }> {
    const user = await this.userModel.findByIdAndUpdate(userId, update, {
      new: true,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
    };
  }

  async updatePassword(
    account: Account,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<void> {
    const user = await this.userModel.findOne({ email: account.email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatched = await compare(updatePasswordDto.password, user.password);
    if (!isMatched) {
      throw new BadRequestException('Invalid password');
    }

    user.password = updatePasswordDto.newPassword;
    await user.save();
  }
}
