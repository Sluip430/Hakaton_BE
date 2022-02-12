import { Repository, getConnection } from 'typeorm';

import { TournamentEntity } from '../entity/tournament.entity';
import { ITournamentIdUserId } from '../Interface/user.interface';
import { IResult } from '../Interface/return.interface';
import { IError } from '../Interface/Error';
import { UserEntity } from '../entity/user.entity';

export class TournamentRepository {
    typeORMRepository: Repository<TournamentEntity>;

    async addUserToTournament(value: ITournamentIdUserId): Promise<IResult<any, IError>> {
      try {
        const user = new UserEntity();

        user.id = value.user_id;
        await getConnection().manager.save(user);

        const tournament = new TournamentEntity();

        tournament.id = value.tournament_id;

        tournament.users = [user];

        const result = await getConnection().manager.save(tournament);

        return { result: { data: result, status: 201 } };
      } catch (error) {
        return { error };
      }
    }
}

export const tournamentRepository = new TournamentRepository();
