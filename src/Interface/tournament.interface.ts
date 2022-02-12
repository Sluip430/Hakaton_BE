import {
  TournamentLevelEnum,
  TournamentModeEnum,
  TournamentScenarioEnum,
  TournamentStatusEnum,
} from '../enum/tournament.enum';

export interface ITournament {
    id: number;
    name: string;
    description: string;
    mode: TournamentModeEnum;
    place: string;
    start_date: Date;
    last_registration_date: Date;
    level: TournamentLevelEnum;
    number_of_participants: number;
    status: TournamentStatusEnum;
    scenario: TournamentScenarioEnum;
    players: number;
}
