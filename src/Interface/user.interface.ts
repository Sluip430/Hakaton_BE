export interface IUser {
    id: number;
    login: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    date_of_birthday: Date;
    gender: string;
    confirmation_send_at: Date;
    activated_at: Date;
    session: { session_id: number, expired_at: Date }[];
}
