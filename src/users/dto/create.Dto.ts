import {
  IsString,
  IsEmail,
  Length,
  IsUUID,
  IsOptional,
  IsDateString,
} from 'class-validator';
export class CreateDto {
  @IsString()
  @Length(3, 32)
  firstname: string;
  @IsString()
  @Length(3, 32)
  lastname: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  @Length(8, 48)
  password: string;
  @IsString()
  @Length(8, 48)
  confirmPassword: string;
  @IsOptional()
  @IsString()
  imageCover: string;
}
