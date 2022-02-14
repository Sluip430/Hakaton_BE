import { getRepository, Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import {
  IResult,
} from '../Interface/return.interface';
import { IError } from '../Interface/Error';
import { ChampionshipStatusEnum } from '../enum/tournament.enum';
import { MatchChampionshipEntity } from '../entity/match-championship';
import { TournamentEntity } from '../entity/tournament.entity';

export class AuthorizationRepository {
    typeORMRepository: Repository<UserEntity>;

    async getUserById(id: number): Promise<IResult<UserEntity, IError>> {
      try {
        this.typeORMRepository = getRepository(UserEntity);
        const result = await this.typeORMRepository.findOne({ where: { id } });

        return { result };
      } catch (error) {
        return { error };
      }
    }

    async setUserStatistic(user: UserEntity, wins: number, loses: number) {
      try {
        this.typeORMRepository = getRepository(UserEntity);
        const UserToUpdate = await this.typeORMRepository.findOne(user.id);

        UserToUpdate.games += 1;
        UserToUpdate.wins += wins;
        UserToUpdate.loses += loses;

        const result = await this.typeORMRepository.save(UserToUpdate);

        return { result };
      } catch (error) {
        return { error };
      }
    }
  
    async getUsers(value: any): Promise<IResult<UserEntity[], IError>> {
      try {
        this.typeORMRepository = getRepository(UserEntity);
        const result = await this.typeORMRepository.find({ where: value });

        return { result };
      } catch (error) {
        return { error };
      }
    }
}

export const userRepository = new AuthorizationRepository();
