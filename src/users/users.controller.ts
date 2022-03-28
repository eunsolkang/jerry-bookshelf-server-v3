import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailVerifyDto } from './dto/email-verify.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<void> {
    const { name, email, password } = dto;
    await this.userService.createUser(name, email, password);
  }

  @Post('/email-verify')
  async checkEmailVerify(@Query() dto: EmailVerifyDto): Promise<void> {
    const { verifyToken } = dto;
    console.log(verifyToken);
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto): Promise<void> {
    return;
  }

  @Get('/:id')
  async getUserInfo(@Param() id: string): Promise<void> {
    return;
  }
}
