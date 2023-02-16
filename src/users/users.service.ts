import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { unlink, unlinkSync } from 'fs';
import PrismaService from 'prisma/prisma.service';
import { CreateDto } from './dto/create.Dto';
import { createUserType } from './types/user.type';
import * as bcrypt from 'bcryptjs';
import { getUserByUnique } from './types/getUser.type';
import { UpdatePasswordDto } from './dto/updatepassword.dto';
@Injectable()
class UsersServices {
  constructor(private readonly prisma: PrismaService) {}
  async createUser(
    createUser: CreateDto,
    image: string,
  ): Promise<createUserType> {
    try {
      const findUser = await this.prisma.user.findFirst({
        where: { email: createUser.email },
      });
      if (findUser) {
        throw new HttpException('user_already_exist', HttpStatus.CONFLICT);
      }
      if (createUser.password !== createUser.confirmPassword)
        throw new BadRequestException('password not confirmed');
      const password = await bcrypt.hash(createUser.password, 10);
      const user = await this.prisma.user.create({
        data: {
          firstname: createUser.firstname,
          lastname: createUser.lastname,
          email: createUser.email,
          password: password,
          imageCover: image,
        },
      });
      return user;
    } catch (error) {
      this.deleteImage(`uploads/${image}`);

      throw new UnauthorizedException(error.message);
    }
  }
  async getUserByEmail(email: string): Promise<getUserByUnique> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: email },
      });
      let { password, ...rest } = user;
      return rest;
    } catch (error) {
      throw new UnauthorizedException('email not exist for user.');
    }
  }
  async getUserById(id: string): Promise<getUserByUnique> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: id },
      });
      if (!user) {
        throw new NotFoundException('user with id ' + id + ' not found');
      }
      let { password, ...rest } = user;
      return rest;
    } catch (error) {
      console.log(error);
    }
  }
  async getUsers(): Promise<getUserByUnique[]> {
    const users = (await this.prisma.user.findMany({
      select: { id: true, firstname: true, lastname: true, email: true },
    })) as getUserByUnique[];
    return users;
  }
  async updateUserPassword(
    id: string,
    payload: UpdatePasswordDto,
  ): Promise<string> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('user with id ' + id + ' not found');
    if (payload.newPassword !== payload.confirmPassword)
      throw new BadRequestException('new messages must be confirmed');
    const equal = await bcrypt.compare(payload.oldPassword, user.password);
    if (!equal)
      throw new BadRequestException('old messages not correct password');
    const updatedPassword = await this.prisma.user.update({
      where: { id },
      data: { password: await bcrypt.hash(payload.newPassword, 10) },
    });
    return 'update user password';
  }
  async deleteUser(): Promise<string> {
    return 'delete user';
  }

  deleteImage(path: string) {
    unlinkSync(path);
  }
}

export default UsersServices;
