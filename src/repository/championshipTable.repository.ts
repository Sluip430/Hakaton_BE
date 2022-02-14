import { getRepository, Repository } from 'typeorm';

import moment from 'moment';
import { ChampionshipTableEntity } from '../entity/championshipTable.entity';
import { MatchChampionshipEntity } from '../entity/match-championship';
import { TournamentEntity } from '../entity/tournament.entity';
import { UserEntity } from '../entity/user.entity';

export class ChampionshipTableRepository {
    typeORMRepository: Repository<ChampionshipTableEntity>;

    async createResultOfMatches(tournament: TournamentEntity, user: UserEntity) {
      try {
        this.typeORMRepository = getRepository(ChampionshipTableEntity);
        const result = await this.typeORMRepository
          .createQueryBuilder()
          .insert()
          .into(ChampionshipTableEntity)
          .values([
            {
              score: 0,
              tournament,
              user,

            },
          ])
          .execute();

        return { result };
      } catch (error) {
        return { error };
      }
    }

    async updateResultOfMatches(value: any, user: UserEntity, score: number) {
      try {
        this.typeORMRepository = getRepository(ChampionshipTableEntity);
        const tournamentToUpdate = await this.typeORMRepository.findOne({ where: { tournament: value.tournament, user } });

        tournamentToUpdate.score += score;
        const result = await this.typeORMRepository.save(tournamentToUpdate);

        return { result };
      } catch (error) {
        return { error };
      }
    }

    async getUserAndChampionship(tournament: TournamentEntity, user: UserEntity) {
      try {
        this.typeORMRepository = getRepository(ChampionshipTableEntity);
        const result = await this.typeORMRepository.findOne({ where: [{ tournament }, { user }] });

        return { result };
      } catch (error) {
        return { error };
      }
    }
}

export const championshipTableRepository = new ChampionshipTableRepository();
