import { Repository } from 'typeorm';

import { TournamentEntity } from '../entity/tournament.entity';

export class UserRepository {
    typeORMRepository: Repository<TournamentEntity>;
    constructor() {}
}

export const userRepository = new UserRepository();
