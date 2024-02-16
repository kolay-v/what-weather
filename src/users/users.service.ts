import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'

@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  async findById (id: number): Promise<User | null> {
    return await this.usersRepository.findOneBy({ id })
  }

  async findByLogin (login: string): Promise<User | null> {
    return await this.usersRepository.findOneBy({ login })
  }

  async create (login: string, hashedPassword: string, fio: string): Promise<User> {
    const user = new User()
    user.login = login
    user.password = hashedPassword
    user.fio = fio
    return await this.usersRepository.save(user)
  }
}
