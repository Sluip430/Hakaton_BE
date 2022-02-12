import {
  Entity, Column, PrimaryGeneratedColumn,
} from 'typeorm';
import { IUser } from '../Interface/user.interface';
import { userRoleEnum } from '../enum/user.enum';

@Entity()
export class UserEntity implements IUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
      unique: true,
    })
    login: string;

    @Column({
      unique: true,
    })
    email: string;

    @Column()
    password: string;

    @Column({
      type: 'enum',
      enum: userRoleEnum,
      default: userRoleEnum.USER,
    })
    role: userRoleEnum;

    @Column({
      nullable: true,
      default: null,
    })
    first_name: string;

    @Column({
      nullable: true,
      default: null,
    })
    last_name: string;

    @Column({
      nullable: true,
      default: null,
    })
    date_of_birthday: Date;

    @Column({
      nullable: true,
      default: null,
    })
    gender: string;

    @Column({
      nullable: true,
      default: null,
    })
    confirmation_send_at: Date;

    @Column({
      nullable: true,
      default: null,
    })
    activated_at: Date;

    @Column({
      default: 0,
    })
    games: number;

    @Column({
      default: 0,
    })
    wins: number;

    @Column({
      default: 0,
    })
    draws: number;

    @Column({
      default: 0,
    })
    loses: number;

    @Column({
      default: 0,
    })
    cup_wins: number;

    @Column({
      type: 'jsonb',
      array: false,
      default: () => "'[]'",
      nullable: false,
    })
    public session: Array<{ session_id: number, expired_at: Date }> = [];
}
