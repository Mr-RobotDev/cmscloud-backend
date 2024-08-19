import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { Account } from '../common/interfaces/account.interface';

@Controller({
  path: 'users',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.ADMIN)
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get('/me')
  getMe(@CurrentUser() account: Account) {
    return this.userService.getUserById(account.sub);
  }

  @Patch('/update-user')
  updateUser(
    @CurrentUser() account: Account,
    @Body() updateUsernameDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(account.sub, updateUsernameDto);
  }

  @Patch('/update-password')
  updatePassword(
    @CurrentUser() account: Account,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.userService.updatePassword(account, updatePasswordDto);
  }
}
