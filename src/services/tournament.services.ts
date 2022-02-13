import { ITournamentIdUserId } from '../Interface/user.interface';
import { tournamentRepository } from '../repository/tournament.repository';
import { IResult } from '../Interface/return.interface';
import { ITournament } from '../Interface/tournament.interface';

export class TournamentServices {
  async create(value: ITournament): Promise<IResult<any, any>> {
    const { result: DBResult, error: DBError } = await tournamentRepository.createTournament(value);

    if (DBError) return { error: DBError };

    return { result: { data: DBResult, status: 200 } };
  }

  async addUserToTournament(value: ITournamentIdUserId) {
    const { result, error } = await tournamentRepository.getUserTournamentById(value);
    
    if (error) return { error: { data: error.message, status: 500 } };

    if (result[0].number_of_participants === result[0].users.length) return { error: { data: 'Tournament is full', status: 400 } };

    const { error: addingError } = await tournamentRepository.addUserToTournament(value);

    if (addingError) return { error: { data: addingError, status: 500 } };

    const { result: DBResult, error: DBError } = await tournamentRepository.addPlayerToAllPlayersTournament(value);

    if (DBError) return { error: { data: error.message, status: 400 } };

    return { result: { data: DBResult, status: 200 } };
  }

  async getTournamentsFilter(value: ITournament) {
    const { result, error } = await tournamentRepository.getTournamentsFilter(value);

    if (error) return { error: { data: error.message, status: 500 } };

    return { result: { data: result, status: 200 } };
  }

  async startTournament(id: number) {
    const { result, error } = await tournamentRepository.getTournamentsFilter(id);

    if (error) return { error: { data: error.message, status: 500 } };

    return { result: { data: result, status: 200 } };
  }
}

export const tournamentServices = new TournamentServices();
