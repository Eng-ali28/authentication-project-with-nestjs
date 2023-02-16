import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Req,
  Res,
} from '@nestjs/common';
import { CreateDto } from 'src/users/dto/create.Dto';
import { createUserType } from 'src/users/types/user.type';
import UsersServices from 'src/users/users.service';
import {} from 'jsonwebtoken';
import { loginDto } from './dto/login.dto';
import AuthService from './auth.service';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import SharpPipe from 'src/services/uploadImage/sharp.pipe';
@Controller('api/v1/auth')
class AuthController {
  constructor(
    private readonly userServices: UsersServices,
    private readonly authService: AuthService,
  ) {}
  @Post('signup')
  @UseInterceptors(FileInterceptor('imageCover'))
  async signup(
    @Body() createUserData: CreateDto,
    @UploadedFile(SharpPipe) image: string,
  ): Promise<createUserType> {
    const user = await this.userServices.createUser(createUserData, image);
    if (!user) {
      throw new BadRequestException('Something went wrong');
    }
    return user;
  }
  @Post('login')
  async login(
    @Body() payload: loginDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    await this.authService.login(payload, req, res);
  }
  @Post('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    return this.authService.logout(req, res);
  }
}

export default AuthController;
