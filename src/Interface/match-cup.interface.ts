import { TournamentEntity } from '../entity/tournament.entity';

export interface IMatchCup {
    id: number,
    tournament: TournamentEntity,
    login: string,
    position: number,
    win: boolean,
    score: number
}
