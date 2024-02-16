import { IsNotEmpty, IsString, Matches } from 'class-validator'

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
    login: string

  @IsString()
  @Matches(/(?=.*[.,!_])(?=.{6,})/)
    password: string

  @IsString()
  @IsNotEmpty()
    fio: string
}
