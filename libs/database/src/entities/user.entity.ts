import { ROLE } from '@app/common/enums/role.enum'
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    unique: true
  })
  email: string

  @Column()
  password: string

  @Column()
  name: string

  @Column({
    nullable: true,
    type: 'text'
  })
  avatar: string

  @Column({
    type: 'enum',
    enum: [ROLE.RENTER, ROLE.PARKING_OWNER],
    default: ROLE.RENTER
  })
  role: string

  @Column({
    unique: true,
    nullable: true
  })
  refreshToken: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
