import { ITournamentIdUserId } from '../Interface/user.interface';
import { tournamentRepository } from '../repository/tournament.repository';

export class TournamentServices {
  async addUserToTournament(value: ITournamentIdUserId) {
    const { result, error } = await tournamentRepository.addUserToTournament(value);

    if (error) return { error: { data: 'Please verify your account ', status: 401 } };

    return { result: { data: result, status: 200 } };
  }
}

export const tournamentServices = new TournamentServices();
