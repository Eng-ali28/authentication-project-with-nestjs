import * as nodemailer from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
class EmailService {
  constructor(private readonly MailerService: MailerService) {}
  async sendEmailVerfication(user: any, token: string) {
    let url = 'http://localhost:3000/verfication?token=' + token;
    console.log('Hereeee', __dirname);
    await this.MailerService.sendMail({
      to: user.email,
      subject: 'Here is your verified email',
      template: './rigster',
      context: {
        name: user.name,
        url,
      },
    });
  }
}
export default EmailService;
