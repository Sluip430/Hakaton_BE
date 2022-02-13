import { ITournamentIdUserId } from '../Interface/user.interface';
import { tournamentRepository } from '../repository/tournament.repository';
import { IResult } from '../Interface/return.interface';
import { ITournament } from '../Interface/tournament.interface';
import { ChampionshipStatusEnum, TournamentModeEnum, TournamentStatusEnum } from '../enum/tournament.enum';
import { championshipRepository } from '../repository/championship.repository';

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

  async startTournament(value: any) {
    const { result, error } = await tournamentRepository.getTournamentsFilter(value);

    if (error) return { error: { data: error.message, status: 500 } };

    const { result: usersResult, error: usersError } = await tournamentRepository.getUserTournamentById(value);

    if (usersError) return { error: { data: error.message, status: 500 } };

    const { users } = usersResult[0];

    if (result.status !== TournamentStatusEnum.OPEN) return { error: { data: 'You can start only open tournament ', status: 400 } };

    if (result.mode === TournamentModeEnum.CHAMPIONSHIP) {
      // Взять всех юзеров из турнамента.

      for (let i = 0; i < users.length; i++) {
        for (let j = i + 1; j < users.length; j++) {
          const match = {
            first_user_score: 0,
            second_user_score: 0,
            date_match: new Date(),
            status: ChampionshipStatusEnum.Coming,
            tournament_id: value.tournament_id,
            first_user: users[i],
            second_user: users[j],
          };

          await championshipRepository.addMatch(match);
        }
      }
    } else {
      return { result: { data: 'Sorry your backend Developers dont realize this feature', status: 418 } };
    }

    result.status = TournamentStatusEnum.ACTIVE;

    const { error: tournamentError } = await tournamentRepository.changeData(result);

    if (tournamentError) return { error: { data: error.message, status: 500 } };

    return { result: { data: users, status: 200 } };
  }
}

export const tournamentServices = new TournamentServices();
