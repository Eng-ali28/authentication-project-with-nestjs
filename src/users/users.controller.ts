import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Body,
  Param,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import UsersServices from './users.service';
import { CreateDto } from './dto/create.Dto';
import { createUserType } from './types/user.type';
import { getUserByUnique } from './types/getUser.type';
import { getByEmailDto, getByIdDto } from './dto/getByUnique.dto';
import { UpdatePasswordDto } from './dto/updatepassword.dto';
import { JwtAuthGuard } from 'src/Auth/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import SharpPipe from 'src/services/uploadImage/sharp.pipe';
@Controller('/api/v1/users')
class UsersController {
  constructor(private readonly userService: UsersServices) {}
  @Post()
  @UseInterceptors(FileInterceptor('imageCover'))
  async createUser(
    @Body() createUserData: CreateDto,
    @UploadedFile(SharpPipe) image: string,
  ): Promise<createUserType> {
    console.log('hereeeee', image);
    return this.userService.createUser(createUserData, image);
  }
  @Get('email')
  async getUserByEmail(@Body() body: getByEmailDto): Promise<getUserByUnique> {
    return this.userService.getUserByEmail(body.email);
  }
  @Get(':id')
  async getUserById(@Param() param: getByIdDto): Promise<getUserByUnique> {
    console.log(param.id);
    return this.userService.getUserById(param.id);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers(): Promise<getUserByUnique[]> {
    return await this.userService.getUsers();
  }
  @Put()
  async updateUserPassword(
    @Param() param: getByIdDto,
    @Body() payload: UpdatePasswordDto,
  ): Promise<string> {
    return this.userService.updateUserPassword(param.id, payload);
  }
  @Delete()
  async deleteUser(): Promise<string> {
    return this.userService.deleteUser();
  }
}
export default UsersController;
