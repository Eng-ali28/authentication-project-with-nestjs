import { IsNotEmpty, IsString, Length } from 'class-validator';
export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  @Length(8, 48)
  oldPassword: string;
  @IsNotEmpty()
  @IsString()
  @Length(8, 48)
  newPassword: string;
  @IsNotEmpty()
  @IsString()
  @Length(8, 48)
  confirmPassword: string;
}
