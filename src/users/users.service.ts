import * as uuid from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { ulid } from 'ulid';
import { AuthService } from '../auth/auth.service';
import UserInfo from "./UserInfo";

@Injectable()
export class UsersService {
  constructor(
    private emailService: EmailService,
    private authService: AuthService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { email, password },
    });

    

    if (!user) {
      throw new NotFoundException('해당 유저를 찾을 수 없습니다.');
    }

    return this.authService.login({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  async createUser(name: string, email: string, password: string) {
    const userExist = await this.checkUserExist(email);

    if (userExist) {
      throw Error('해당 이메일은 중복입니다.');
    }

    const verifyToken = uuid.v1();

    await this.saveUser(name, email, password, verifyToken);
    await this.sendVerifyEmail(email, verifyToken);
  }

  async getUserInfo(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    
    if (!user) {
      throw new NotFoundException('유저를 찾을 수 없습니다.');
    }

    return user;
  }

  async verifyEmail(verifyToken: string): Promise<void> {
    const user = await this.userRepository.findOne({where: {verifyToken: verifyToken}});
    if ( user ){
      await this.userRepository.update(user.id, {isEmailVerfied: true});
    }
  }

  private async checkUserExist(emailAddress: string) {
    const user = await this.userRepository.findOne({
      where: { email: emailAddress },
    });
    
    if (!user) return false;

    return true;
  }

  private async saveUser(
    name: string,
    email: string,
    password: string,
    verifyToken: string,
  ) {
    const user = new UserEntity();

    user.id = ulid();
    user.name = name;
    user.email = email;
    user.password = password;
    user.verifyToken = verifyToken;

    await this.userRepository.save(user);
  }

  private async sendVerifyEmail(email: string, verifyToken: string) {
    await this.emailService.sendVerifyEmail(email, verifyToken);
  }
}
