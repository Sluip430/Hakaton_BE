import { ITournamentIdUserId } from '../Interface/user.interface';
import { tournamentRepository } from '../repository/tournament.repository';
import { IResult } from '../Interface/return.interface';
import { ITournament } from '../Interface/tournament.interface';
import { ChampionshipStatusEnum, TournamentModeEnum, TournamentStatusEnum } from '../enum/tournament.enum';
import { championshipRepository } from '../repository/championship.repository';
import { championshipTableRepository } from '../repository/championshipTable.repository';
import { userRepository } from '../repository/user.repository';
import { decodeToken } from './jwt';
import { ConfigurationService } from '../configurations/controller.config';

export class TournamentServices {
  async create(value: ITournament): Promise<IResult<any, any>> {
    const { result: DBResult, error: DBError } = await tournamentRepository.createTournament(value);

    if (DBError) return { error: { data: DBError.message, status: 500 } };

    return { result: { data: DBResult, status: 200 } };
  }

  async addUserToTournament(value: ITournamentIdUserId) {
    const { result, error } = await tournamentRepository.getUserTournamentById(value);

    if (error) return { error: { data: error.message, status: 500 } };

    if (result[0].number_of_participants === result[0].users.length) return { error: { data: 'Tournament is full', status: 400 } };

    const { error: addingError } = await tournamentRepository.addUserToTournament(value);

    if (addingError) return { error: { data: addingError, status: 500 } };

    console.log(value);
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
    const { result, error } = await tournamentRepository.getUserTournamentById(value);

    if (error) return { error: { data: error, status: 500 } };

    const { result: usersResult, error: usersError } = await tournamentRepository.getUserTournamentById(value);

    if (usersError) return { error: { data: error, status: 500 } };

    const { users } = usersResult[0];

    if (result[0].status !== TournamentStatusEnum.OPEN) return { error: { data: 'You can start only open tournament ', status: 400 } };

    if (result[0].mode === TournamentModeEnum.CHAMPIONSHIP) {
      for (let i = 0; i < users.length; i++) {
        await championshipTableRepository.createResultOfMatches(result[0], users[i]);
        for (let j = i + 1; j < users.length; j++) {
          const match = {
            first_user_score: 0,
            second_user_score: 0,
            date_match: new Date(),
            status: ChampionshipStatusEnum.Coming,
            tournament: value.tournament_id,
            first_user: users[i],
            second_user: users[j],
          };

          await championshipRepository.addMatch(match);
        }
      }
    } else {
      return { result: { data: 'Sorry your backend Developers dont realize this feature', status: 418 } };
    }

    result[0].status = TournamentStatusEnum.ACTIVE;

    const { error: tournamentError } = await tournamentRepository.changeData(result);

    if (tournamentError) return { error: { data: error.message, status: 500 } };

    return { result: { data: users, status: 200 } };
  }

  async getChampionshipMatchesForUser(value: ITournament) {
    const { result, error } = await championshipRepository.getMatchesForUser(value);

    if (error) return { error: { data: error.message, status: 500 } };

    return { result: { data: result, status: 200 } };
  }

  async setChampMatchResult(value: any) {
    const { result, error } = await championshipRepository.setMatchResult(value);

    if (error) return { error: { data: error.message, status: 500 } };

    const { result: matchResult, error: matchError } = await championshipRepository.getChampionshipByMatchId(value);

    if (matchError) return { error: { data: matchError.message, status: 501 } };

    if (matchResult[0].first_user_score === matchResult[0].second_user_score) {
      return { error: { data: 'Only one player can win', status: 500 } };
    }

    if (matchResult[0].status === ChampionshipStatusEnum.Coming) {
      const { error: firstUserError }
          = await championshipTableRepository.updateResultOfMatches(
            matchResult[0], matchResult[0].first_user, matchResult[0].first_user_score,
          );

      if (firstUserError) return { error: { data: firstUserError.message, status: 500 } };
      const { error: secondUserError }
          = await championshipTableRepository.updateResultOfMatches(
            matchResult[0], matchResult[0].second_user, matchResult[0].second_user_score,
          );

      if (matchResult[0].first_user_score > matchResult[0].second_user_score) {
        await userRepository.setUserStatistic(matchResult[0].first_user, 1, 0);
        await userRepository.setUserStatistic(matchResult[0].second_user, 0, 1);
      } else {
        await userRepository.setUserStatistic(matchResult[0].second_user, 1, 0);
        await userRepository.setUserStatistic(matchResult[0].first_user, 0, 1);
      }

      if (secondUserError) return { error: { data: secondUserError.message, status: 500 } };
    }

    await championshipRepository.setMatchStatus(value, ChampionshipStatusEnum.FINISHED);

    return { result: { data: result, status: 200 } };
  }

  async getChampionshipStatistic(value: ITournament) {
    const { result, error } = await tournamentRepository.getTournamentById(value);

    if (result.mode !== TournamentModeEnum.CHAMPIONSHIP) {
      return { error: { data: 'This tournament mode isn`t championship', status: 500 } };
    }

    if (error) return { error: { data: error, status: 500 } };

    return { result: { data: result, status: 200 } };
  }

  async getChampionshipTable(value: ITournament) {
    const { result, error } = await tournamentRepository.getTournamentById(value);

    if (error) return { error: { data: error, status: 500 } };

    if (result.mode !== TournamentModeEnum.CHAMPIONSHIP) {
      return { error: { data: 'This tournament mode isn`t championship', status: 500 } };
    }

    const { result: tableResult, error: tableError } = await championshipTableRepository.getChampionshipTable(value);

    if (tableError) return { error: { data: tableError, status: 501 } };

    return { result: { data: tableResult, status: 200 } };
  }

  async getChampionshipMatchesByUser(value) {
    const { result: userResult, error: errorResult } = await userRepository.getUserById(value.user_id);

    if (errorResult) return { error: { data: errorResult, status: 500 } };

    const { result: matchResult, error: matchError } = await championshipRepository.getMatchesForUser1(value, userResult);

    if (matchError) return { error: { data: matchError, status: 500 } };

    return { result: { data: matchResult, status: 200 } };
  }

  async enterToTournament(body, token) {
    const { result, error } = await decodeToken(token as string, ConfigurationService.getCustomKey('JWT_ACCESS_KEY'));

    const newObj = {
      tournament_id: body.tournament_id,
      user_id: result.id,
    };

    const { error: addingError } = await tournamentRepository.addUserToTournament(newObj);

    if (addingError) return { error: { data: addingError.message, status: 500 } };

    return { result: { data: 'Add', status: 200 } };
  }
}

export const tournamentServices = new TournamentServices();
