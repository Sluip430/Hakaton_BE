import { getRepository, Repository } from 'typeorm';

import moment from 'moment';
import { TournamentEntity } from '../entity/tournament.entity';
import { IUser } from '../Interface/user.interface';
import { IResult, IReturnUserEntity } from '../Interface/return.interface';
import { IError } from '../Interface/Error';
import { UserEntity } from '../entity/user.entity';
import {ITournament} from "../Interface/tournament.interface";

export class TournamentRepository {
    typeORMRepository: Repository<TournamentEntity>;
    constructor() {}
    async createTournament(value: ITournament): Promise<IResult<TournamentEntity, IError>> {
      try {
        this.typeORMRepository = getRepository(TournamentEntity);
        const tournament = this.typeORMRepository.create(value);
        const result = await this.typeORMRepository.save(tournament);

        return { result };
      } catch (error) {
        return { error };
      }
    }
}

export const tournamentRepository = new TournamentRepository();
