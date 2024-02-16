import {
  Body, ConflictException,
  Controller,
  Post,
  UnauthorizedException
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { type AuthResponse } from './auth.response'
import { LoginDto } from './login.dto'
import { RegisterDto } from './register.dto'
import { AuthService } from './auth.service'

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor (
    private readonly authService: AuthService
  ) {}

  @Post('login')
  async login (@Body() data: LoginDto): Promise<AuthResponse> {
    const response = await this.authService.login(data)
    if (response == null) {
      throw new UnauthorizedException('Invalid login or password.')
    }
    return response
  }

  @Post('register')
  async register (@Body() data: RegisterDto): Promise<AuthResponse> {
    const response = await this.authService.register(data)
    if (response == null) {
      throw new ConflictException('User already exists')
    }
    return response
  }
}
