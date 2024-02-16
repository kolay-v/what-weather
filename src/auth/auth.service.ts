import { Injectable } from '@nestjs/common'
import { type LoginDto } from './login.dto'
import { type AuthResponse } from './auth.response'
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcrypt'
import * as crypto from 'crypto'
import { InjectRepository } from '@nestjs/typeorm'
import { Token } from './token.entity'
import { Repository } from 'typeorm'
import { type User } from '../users/user.entity'
import { type RegisterDto } from './register.dto'

@Injectable()
export class AuthService {
  constructor (
    private readonly usersService: UsersService,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>
  ) {}

  async login (data: LoginDto): Promise<AuthResponse | null> {
    const user = await this.usersService.findByLogin(data.login)
    if (user == null) {
      return null
    }
    const isPasswordMatch = await bcrypt.compare(data.password, user.password)
    if (!isPasswordMatch) {
      return null
    }
    const apiToken = await this.generateApiToken(user)
    return {
      apiToken,
      fio: user.fio
    }
  }

  async register (data: RegisterDto): Promise<AuthResponse | null> {
    const oldUser = await this.usersService.findByLogin(data.login)
    if (oldUser != null) {
      return null
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)
    const user = await this.usersService.create(data.login, hashedPassword, data.fio)
    const apiToken = await this.generateApiToken(user)
    return {
      apiToken,
      fio: user.fio
    }
  }

  private async generateApiToken (user: User): Promise<string> {
    const apiToken = crypto.randomBytes(8).toString('hex')
    const token = new Token()
    token.user = user
    token.apiToken = apiToken
    await this.tokenRepository.save(token)
    return apiToken
  }

  async validateToken (apiToken: string): Promise<User | null> {
    const token = await this.tokenRepository.findOne({
      relations: ['user'],
      where: { apiToken }
    })
    return token?.user ?? null
  }
}
