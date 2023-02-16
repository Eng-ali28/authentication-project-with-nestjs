import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import PrismaModule from 'prisma/prisma.module';
import AuthModule from './Auth/auth.module';
import UsersModule from './users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PrismaModule,
    MulterModule.register({
      storage: memoryStorage(),
    }),
  ],
})
class AppModule {}

export default AppModule;
