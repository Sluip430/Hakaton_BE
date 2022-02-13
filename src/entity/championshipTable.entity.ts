import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne,
} from 'typeorm';
import { TournamentEntity } from './tournament.entity';
import { IMatchCup } from '../Interface/match-cup.interface';
import { UserEntity } from './user.entity';
import { ChampionshipStatusEnum } from '../enum/tournament.enum';

@Entity()
export class ChampionshipTableEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => TournamentEntity, (tournament) => tournament.id)
    tournament: TournamentEntity;

    @ManyToOne(() => UserEntity, (user) => user.id)
    user: UserEntity;

    @Column()
    score: number;
}
