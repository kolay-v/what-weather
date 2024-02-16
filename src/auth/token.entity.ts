import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm'
import { User } from '../users/user.entity'

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
    id: number

  @Column()
    apiToken: string

  @CreateDateColumn()
    createdAt: Date

  @ManyToOne(() => User)
    user: User
}
