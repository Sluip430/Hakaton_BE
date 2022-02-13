import { getRepository, Repository } from 'typeorm';
import { MatchChampionshipEntity } from '../entity/match-championship';
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
}

export const championshipRepository = new ChampionshipRepository();
