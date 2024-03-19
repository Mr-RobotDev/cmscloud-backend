import { Body, Controller, Get, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Account } from '../common/interfaces/account.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller({
  path: 'users',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

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
