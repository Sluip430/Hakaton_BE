import {
  Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany,
} from 'typeorm';
import {
  TournamentLevelEnum,
  TournamentModeEnum,
  TournamentScenarioEnum,
  TournamentStatusEnum,
} from '../enum/tournament.enum';
import { ITournament } from '../Interface/tournament.interface';
import { UserEntity } from './user.entity';

@Entity()
export class TournamentEntity implements ITournament {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
      length: 255,
      unique: true,
    })
    name: string;

    @Column({
      length: 100,
    })
    description: string;

    @Column({
      type: 'enum',
      enum: TournamentModeEnum,
    })
    mode: TournamentModeEnum;

    @Column({
    })
    place: string;

    @Column({
    })
    start_date: Date;

    @Column({
    })
    last_registration_date: Date;

    @Column({
      type: 'enum',
      enum: TournamentLevelEnum,
      default: TournamentLevelEnum.MIDDLE,
    })
    level: TournamentLevelEnum;

    @Column()
    number_of_participants: number;

    @Column({
      type: 'enum',
      enum: TournamentStatusEnum,
      default: TournamentStatusEnum.OPEN,
    })
    status: TournamentStatusEnum;

    @Column({
      type: 'enum',
      enum: TournamentScenarioEnum,
    })
    scenario: TournamentScenarioEnum;

    @Column({
    })
    players: number;

    @ManyToMany(() => UserEntity)
    @JoinTable()
    users: UserEntity[];
}
