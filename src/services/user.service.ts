import { ITournamentIdUserId, IUser } from '../Interface/user.interface';
import { tournamentRepository } from '../repository/tournament.repository';
import { IResult } from '../Interface/return.interface';
import { userRepository } from '../repository/user.repository';

export class UserServices {
  async getUserById(id: number): Promise<IResult<any, any>> {
    const { result: DBResult, error: DBError } = await userRepository.getUserById(id);

    if (DBError) return { error: DBError };

    return { result: { data: DBResult, status: 200 } };
  }
  async addUserToTournament(value: ITournamentIdUserId) {
    const { result, error } = await tournamentRepository.addUserToTournament(value);

    if (error) return { error: { data: 'Please verify your account ', status: 401 } };

    return { result: { data: result, status: 200 } };
  }

  async getUsers(value: any): Promise<IResult<any, any>> {
    const { result: DBResult, error: DBError } = await userRepository.getUsers(value);

    if (DBError) return { error: DBError };

    return { result: { data: DBResult, status: 200 } };
  }
}

export const userServices = new UserServices();
