import * as uuid from 'uuid';
import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';

@Injectable()
export class UsersService {
  constructor(private emailService: EmailService) {}
  async createUser(name: string, email: string, password: string) {
    this.checkUserExist(email);

    const verifyToken = uuid.v1();

    await this.saveUser(name, email, password);
    await this.sendVerifyEmail(email, verifyToken);
  }

  private checkUserExist(email: string) {
    return false; // TODO: DB 연동 후 구현
  }

  private saveUser(name: string, email: string, password: string) {
    return; // TODO: DB 연동 지점
  }

  private async sendVerifyEmail(email: string, verifyToken: string) {
    await this.emailService.sendVerifyEmail(email, verifyToken);
  }
}
