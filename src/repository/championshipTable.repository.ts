import { getRepository, Repository } from 'typeorm';

import { ChampionshipTableEntity } from '../entity/championshipTable.entity';
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

    async getChampionshipTable(value: any) {
      try {
        this.typeORMRepository = getRepository(ChampionshipTableEntity);
        const result = await this.typeORMRepository
          .createQueryBuilder('championshipTable')
          .leftJoinAndSelect('championshipTable.user', 'user')
          .where(`championshipTable.tournament = ${value.tournament_id}`)
          .getMany();

        return { result };
      } catch (error) {
        return { error };
      }
    }
}

export const championshipTableRepository = new ChampionshipTableRepository();
