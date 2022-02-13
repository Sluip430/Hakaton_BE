import { getRepository, Repository } from 'typeorm';
import moment from 'moment';
import { MatchChampionshipEntity } from '../entity/match-championship';
import { TournamentEntity } from '../entity/tournament.entity';
import { UserEntity } from '../entity/user.entity';

export class ChampionshipRepository {
    typeORMRepository: Repository<MatchChampionshipEntity>;

    async addMatch(value: any) {
      try {
        this.typeORMRepository = getRepository(MatchChampionshipEntity);
        const tournament = this.typeORMRepository.create(value);
        const result = await this.typeORMRepository.save(tournament);

        return { result };
      } catch (error) {
        return { error };
      }
    }

    async getMatchesForUser(value: any) {
      try {
        this.typeORMRepository = getRepository(MatchChampionshipEntity);
        const result = await this.typeORMRepository.find({ where: [{ first_user: value.user_id }, { second_user: value.user_id }] });
        return { result };
      } catch (error) {
        return { error };
      }
    }

    async setMatchResult(value: any) {
      try {
        this.typeORMRepository = getRepository(MatchChampionshipEntity);
        const result = await this.typeORMRepository.createQueryBuilder().update(MatchChampionshipEntity).set({
          first_user_score: value.first_user_score,
          second_user_score: value.second_user_score,
        })
          .where('id = :id', { id: value.match_id })
          .execute();

        return { result };
      } catch (error) {
        return { error };
      }
    }
}

export const championshipRepository = new ChampionshipRepository();
