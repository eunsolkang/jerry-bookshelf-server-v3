import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Headers,
  UseGuards,
  Inject,
  Header,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailVerifyDto } from './dto/email-verify.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UsersService } from './users.service';
import UserInfo from './UserInfo';
import { AuthService } from '../auth/auth.service';
import AuthGuard from '../auth.guard';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { WinstonLogger, WINSTON_MODULE_PROVIDER } from 'nest-winston';

@Controller('users')

export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,

  ) {}
  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<void> {
    const { name, email, password } = dto;
    await this.userService.createUser(name, email, password);
  }

  @Post('/email-verify')
  async checkEmailVerify(@Query() dto: EmailVerifyDto): Promise<void> {
    const { verifyToken } = dto;
    this.userService.verifyEmail(verifyToken);
  }

  @Post('/login')
  async login(@Body() dto: UserLoginDto): Promise<UserLoginResponseDto> {
    
    const { email, password } = dto;
    const jwt = await this.userService.login(email, password);

    return {
      jwt
    } 
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getUserInfo(
    @Headers() header: any,
    @Param('id') id: string,
    
  ): Promise<UserInfo> {
    return await this.userService.getUserInfo(id);
  }
}
