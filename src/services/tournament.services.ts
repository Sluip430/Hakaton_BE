import { IResult } from '../Interface/return.interface';
import { ITournament } from '../Interface/tournament.interface';
import { tournamentRepository } from '../repository/tournament.repository';

export class TournamentServices {
  async create(value: ITournament): Promise<IResult<any, any>> {
    const { result: DBResult, error: DBError } = await tournamentRepository.createTournament(value);

    if (DBError) return { error: DBError };

    return { result: { data: DBResult, status: 200 } };
  }
}

export const tournamentServices = new TournamentServices();
