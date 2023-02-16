import { IsString, IsEmail, Length, IsUUID } from 'class-validator';
export class UpdateDto {
  @IsString()
  @IsUUID(4)
  id?: string;
  @IsString()
  @Length(3, 32)
  firstname?: string;
  @IsString()
  @Length(3, 32)
  lastname?: string;
  @IsString()
  @IsEmail()
  email?: string;
  @IsString()
  @Length(8, 48)
  password?: string;
  @IsString()
  @Length(8, 48)
  confirmPassword?: string;
}
