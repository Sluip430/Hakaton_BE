import { ITournamentIdUserId } from '../Interface/user.interface';
import { tournamentRepository } from '../repository/tournament.repository';  
import { IResult } from '../Interface/return.interface';
import { ITournament } from '../Interface/tournament.interface';
import { tournamentRepository } from '../repository/tournament.repository';

export class TournamentServices {
  async create(value: ITournament): Promise<IResult<any, any>> {
    const { result: DBResult, error: DBError } = await tournamentRepository.createTournament(value);

    if (DBError) return { error: DBError };

    return { result: { data: DBResult, status: 200 } };
  }
  async addUserToTournament(value: ITournamentIdUserId) {
    const { result, error } = await tournamentRepository.addUserToTournament(value);

    if (error) return { error: { data: 'Please verify your account ', status: 401 } };

    return { result: { data: result, status: 200 } };
}

export const tournamentServices = new TournamentServices();
