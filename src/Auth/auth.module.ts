import { Module } from '@nestjs/common';
import UsersModule from 'src/users/users.module';
import AuthController from './auth.controller';
import AuthService from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import PrismaModule from 'prisma/prisma.module';
import { JwtStrategy } from './jwt.strategy';
import { MailerModule } from '@nestjs-modules/mailer';
import EmailModule from 'src/services/mail-service/email.module';
@Module({
  imports: [
    UsersModule,
    PrismaModule,
    JwtModule.register({
      secret: 'secretkeywitjhdatja',
    }),
    EmailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
class AuthModule {}

export default AuthModule;
