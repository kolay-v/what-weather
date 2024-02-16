import { IsNotEmpty, IsString, Matches } from 'class-validator'

export class LoginDto {
  @IsString()
  @IsNotEmpty()
    login: string

  @IsString()
  @Matches(/(?=.*[.,!_])(?=.{6,})/)
    password: string
}
