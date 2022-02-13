import { Repository, getConnection, getRepository } from 'typeorm';
import { TournamentEntity } from '../entity/tournament.entity';
import { ITournamentIdUserId } from '../Interface/user.interface';
import { IResult } from '../Interface/return.interface';
import { IError } from '../Interface/Error';
import { UserEntity } from '../entity/user.entity';
import { ITournament } from '../Interface/tournament.interface';

export class TournamentRepository {
    typeORMRepository: Repository<TournamentEntity>;

    async addUserToTournament(value: ITournamentIdUserId): Promise<IResult<any, IError>> {
      try {
        const result = await this.typeORMRepository
          .createQueryBuilder('tournament')
          .relation(TournamentEntity, 'users')
          .of(value.tournament_id)
          .add(value.user_id);

        return { result: { data: result, status: 201 } };
      } catch (error) {

        return { error };
      }
    }

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

    async addPlayerToAllPlayersTournament(value: any): Promise<IResult<TournamentEntity, IError>> {
      try {
        this.typeORMRepository = getRepository(TournamentEntity);
        const tournamentToUpdate = await this.typeORMRepository.findOne(value.tournament_id);

        tournamentToUpdate.players += 1;
        const result = await this.typeORMRepository.save(tournamentToUpdate);

        return { result };
      } catch (error) {
        return { error };
      }
    }

    async getTournamentsFilter(value: any): Promise<IResult<TournamentEntity[], IError>> {
      try {
        this.typeORMRepository = getRepository(TournamentEntity);
        const result = await this.typeORMRepository.find({ where: value });

        return { result };
      } catch (error) {
        return { error };
      }
    }

    async getUserTournamentById(value: any) {
      try {
        this.typeORMRepository = getRepository(TournamentEntity);
        const result = await this.typeORMRepository
          .createQueryBuilder('tournament')
          .leftJoinAndSelect('tournament.users', 'users')
          .where(`tournament.id = ${value.tournament_id}`)
          .getMany();

        return { result };
      } catch (error) {
        return { error };
      }
    }
}

export const tournamentRepository = new TournamentRepository();
