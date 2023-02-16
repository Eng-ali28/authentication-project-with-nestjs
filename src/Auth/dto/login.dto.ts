import { IsNotEmpty, IsEmail, Length } from 'class-validator';
export class loginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @Length(8, 46)
  password: string;
}
