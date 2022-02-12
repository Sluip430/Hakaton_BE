import { userRoleEnum } from '../enum/user.enum';

export interface IUser {
    id: number;
    login: string;
    email: string;
    password: string;
    role: userRoleEnum;
    first_name: string;
    last_name: string;
    date_of_birthday: Date;
    gender: string;
    confirmation_send_at: Date;
    activated_at: Date;
    games: number;
    wins: number;
    draws: number;
    loses: number;
    cup_wins: number;
    session: { session_id: number, expired_at: Date }[];
}

export interface ITournamentIdUserId {
   tournament_id: number,
   user_id: number,
}
