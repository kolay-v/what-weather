import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Action } from '../weather/action.entity'
import { Token } from '../auth/token.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
    id: number

  @Column({ unique: true })
    login: string

  @Column()
    password: string

  @Column()
    fio: string

  @OneToMany(() => Action, (action) => action.user)
    actions: Action[]

  @OneToMany(() => Token, (token) => token.user)
    tokens: Token[]
}
