import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import PrismaService from 'prisma/prisma.service';
import { loginDto } from './dto/login.dto';
import { payloadToken } from './types/payloadtoken.type';
import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import EmailService from 'src/services/mail-service/email.service';
@Injectable()
class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService,
    private readonly mailService: EmailService,
  ) {}
  async createToken(payload: payloadToken): Promise<string> {
    return this.jwt.sign(payload, { expiresIn: '7d' });
  }
  async login(payload: loginDto, req: Request, res: Response) {
    try {
      const foundUser = await this.prisma.user.findUnique({
        where: { email: payload.email },
      });
      if (!foundUser)
        throw new UnauthorizedException('email or password are not correct');
      const isMatch = await bcrypt.compare(
        payload.password,
        foundUser.password,
      );
      if (!isMatch)
        throw new UnauthorizedException('email or password are not correct');
      const token = await this.createToken({
        userId: foundUser.id,
        email: foundUser.email,
      });
      res.cookie('token', token, { httpOnly: true });
      this.mailService
        .sendEmailVerfication(foundUser, token)
        .then((result) => {
          res.json({ token });
        })
        .catch((err) => {
          throw new BadRequestException('email not send, retry again');
        });
    } catch (error) {
      throw new UnauthorizedException('email or password are not correct');
    }
  }
  async logout(req: Request, res: Response): Promise<void> {
    if (!req.cookies['token']) {
    }
    res.clearCookie('token');
    res.json({ message: 'logout successfully' });
  }
}

export default AuthService;
