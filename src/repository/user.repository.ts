import { getRepository, Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import {
  IResult,
} from '../Interface/return.interface';
import { IError } from '../Interface/Error';
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
