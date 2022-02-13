import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne,
} from 'typeorm';
import { TournamentEntity } from './tournament.entity';
import { IMatchCup } from '../Interface/match-cup.interface';

@Entity()
export class MatchCupEntity implements IMatchCup {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => TournamentEntity, (tournament) => tournament.id)
    tournament: TournamentEntity;

    @Column({
      unique: true,
    })
    login: string;

    @Column()
    position: number;

    @Column()
    win: boolean;

    @Column()
    score: number;
}
