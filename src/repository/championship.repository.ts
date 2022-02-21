import { getRepository, Repository } from 'typeorm';
import { MatchChampionshipEntity } from '../entity/match-championship';
import { UserEntity } from '../entity/user.entity';
import { ChampionshipStatusEnum } from '../enum/tournament.enum';
import { TournamentEntity } from '../entity/tournament.entity';

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

    async setMatchStatus(value: any, status: ChampionshipStatusEnum) {
      try {
        this.typeORMRepository = getRepository(MatchChampionshipEntity);
        const result = await this.typeORMRepository.createQueryBuilder().update(MatchChampionshipEntity).set({
          status,
        })
          .where('id = :id', { id: value.match_id })
          .execute();

        return { result };
      } catch (error) {
        return { error };
      }
    }

    async getChampionshipByMatchId(value: any) {
      try {
        this.typeORMRepository = getRepository(MatchChampionshipEntity);
        const result = await this.typeORMRepository
          .createQueryBuilder('championship')
          .leftJoinAndSelect('championship.first_user', 'firstUser')
          .leftJoinAndSelect('championship.second_user', 'secondUser')
          .leftJoinAndSelect('championship.tournament', 'tournament')
          .where(`championship.id = ${value.match_id}`)
          .getMany();

        return { result };
      } catch (error) {
        return { error };
      }
    }

    async getTournamentMatches(value: any) {
      try {
        this.typeORMRepository = getRepository(MatchChampionshipEntity);
        const result = await this.typeORMRepository
          .createQueryBuilder('championship')
          .leftJoinAndSelect('championship.first_user', 'first_user')
          .leftJoinAndSelect('championship.second_user', 'second_user')
          .where(`championship.tournament = ${value.tournament_id}`)
          .getMany();

        return { result };
      } catch (error) {
        return { error };
      }
    }
}

export const championshipRepository = new ChampionshipRepository();
