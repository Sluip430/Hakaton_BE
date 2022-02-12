import { IResult, IReturnError, IReturnResultWithToken } from '../Interface/return.interface';
import { ITournament } from '../Interface/tournament.interface';

export class TournamentServices {
  async create(value: ITournament): Promise<IResult<any, any>> {
  }
}

export const tournamentServices = new TournamentServices();
