import { IsUUID, IsNotEmpty, IsEmail } from 'class-validator';
export class getByIdDto {
  @IsNotEmpty()
  @IsUUID(4)
  id: string;
}

export class getByEmailDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
