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
        const user = new UserEntity();

        user.id = value.user_id;
        await getConnection().manager.save(user);

        const tournament = new TournamentEntity();

        tournament.id = value.tournament_id;

        tournament.users = [user];

        const result = await getConnection().manager.save(tournament);

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
    async getTournamentsFilter(value: any): Promise<IResult<TournamentEntity[], IError>> {
      try {
        const { page, perPage } = value;

        delete value.page;
        delete value.perPage;

        this.typeORMRepository = getRepository(TournamentEntity);
        const result = await this.typeORMRepository.find({
          order:
            value,
          skip: page,
          take: perPage,
        });

        return { result };
      } catch (error) {
        return { error };
      }
    }
}

export const tournamentRepository = new TournamentRepository();
