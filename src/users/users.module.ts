import { Module } from '@nestjs/common';
import PrismaService from 'prisma/prisma.service';
import { JwtStrategy } from 'src/Auth/jwt.strategy';
import UsersController from './users.controller';
import UsersServices from './users.service';
@Module({
  providers: [UsersServices, PrismaService, JwtStrategy],
  controllers: [UsersController],
  exports: [UsersServices],
})
class UsersModule {}
export default UsersModule;
