import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { SessionGuard } from 'src/auth/guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(SessionGuard)
  @Get(':username')
  getMe(@Request() req) {
    return req.user;
  }
}
