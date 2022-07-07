import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';

import { Inject, Injectable } from '@nestjs/common';
import emailConfig from '../config/emailConfig';
import { ConfigType } from '@nestjs/config';
import { config } from 'rxjs';

interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter: Mail;

  constructor(
    @Inject(emailConfig.KEY) private config: ConfigType<typeof emailConfig>,
  ) {
    this.transporter = nodemailer.createTransport({
      service: config.service,
      host: 'smtp.google.com',
      secure: true,
      auth: {
        type: 'OAuth2',
        user: config.oauth.user,
        clientId: config.oauth.clientId,
        clientSecret: config.oauth.clientSecret,
        refreshToken: config.oauth.refreshToken,
      },
    });

  }

  async sendVerifyEmail(emailAddress: string, verifyToken: string) {
    const baseUrl = this.config.baseUrl;

    const url = `${baseUrl}/users/email-verify?verifyToken=${verifyToken}`;

    const mailOptions: EmailOptions = {
      from: this.config.oauth.user,
      to: emailAddress,
      subject: '가입 인증 메일',
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Document</title>
          <style>
              .invitation-box{
                  margin: 0;
                  padding: 0;
                  width: 100%;
                  height: 100vh;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  background-color: #e2e2e2;
              }
              .invitation-box .cover{
                  background-color: white;
                  min-width: 780px;
                  width: 100%;
                  margin-left: 4rem;
                  margin-right: 4rem;
                  box-sizing: border-box;
                  padding: .5rem;
                  border-radius: 4px;
              }
              .invitation-box .container{
                  padding: 2rem;
                  border-radius: 24px;
                  border: 3px solid #fcbe11;
              }
              .invitation-box .container .title{
                  font-size: 1.75rem;
                  font-weight: bold;
                  text-align: left;
                  margin-bottom: 1rem;
              }
              .invitation-box .container p span{
               
                font-weight: bold;
                padding-left: .25rem;
                padding-right: .25rem;
      
              }
              .invitation-box .container button {
                  background: #fcbe11;
                  outline: none;
                  color: rgb(34, 34, 34);
                  border: none;
                  font-weight: bold;
                  padding: .5rem 1rem;
                  cursor: pointer;
                  border-radius: 24px;
                  margin-top: 1rem;
              }
              .invitation-box .container button:hover{
                  background: #ffcd44;
              }
          </style>
      </head>
      <body>
          <div class='invitation-box'>
             
              <div class="cover">
                  <div class="container">
                      <div class="title">회원가입을 축하드립니다!</div>
                      <p>
                          안녕하세요!</br>
                          이메일을 인증하고 <span>제리 책방</span>의 서비스를 마음껏 즐겨보세요
                      </p>
                      <form action="${url}" method="POST">
                          <button>이메일 인증하기</button>
                      </form>
                  </div>
              </div>
      
          </div>
      </body>
      </html>
      `,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
