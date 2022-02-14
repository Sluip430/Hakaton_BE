import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne,
} from 'typeorm';
import { TournamentEntity } from './tournament.entity';
import { UserEntity } from './user.entity';
import { ChampionshipStatusEnum } from '../enum/tournament.enum';
import { IMatchChampionship } from '../Interface/championship.interface';

@Entity()
export class MatchChampionshipEntity implements IMatchChampionship {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => TournamentEntity, (tournament) => tournament.id)
    tournament: TournamentEntity;

    @ManyToOne(() => UserEntity, (user) => user.id)
    first_user: UserEntity;

    @ManyToOne(() => UserEntity, (user) => user.id)
    second_user: UserEntity;

    @Column()
    first_user_score: number;

    @Column()
    second_user_score: number;

    @Column()
    date_match: Date;

    @Column()
    status: ChampionshipStatusEnum;
}
