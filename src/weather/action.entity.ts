import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm'
import { User } from '../users/user.entity'

@Entity()
export class Action {
  @PrimaryGeneratedColumn()
    id: number

  @CreateDateColumn()
    actionTime: Date

  @Column()
    tempC?: number

  @Column()
    resultStatus: number

  @ManyToOne(() => User)
    user: User
}
