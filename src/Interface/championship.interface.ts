import { TournamentEntity } from '../entity/tournament.entity';
import { UserEntity } from '../entity/user.entity';
import { ChampionshipStatusEnum } from '../enum/tournament.enum';

export interface IMatchChampionship{
    id: number,
    tournament: TournamentEntity,
    first_user: UserEntity,
    second_user: UserEntity,
    first_user_score: number,
    second_user_score: number,
    date_match: Date,
    status: ChampionshipStatusEnum,
}
