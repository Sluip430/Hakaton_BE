import { NextFunction, Request, Response } from 'express';
import {
  addUserToTournamentValidation,
  createValidation,
  getTournamentValidation
} from '../middlewares/validation/tournament.validator';
import { tournamentServices } from '../services/tournament.services';

export class TournamentController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { value, error: validationError } = createValidation.validate(req.body, { abortEarly: false });

    if (validationError) return next({ data: validationError, status: 400 });

    const { result, error } = await tournamentServices.create(value);

    if (error) return next({ data: error.data, status: error.status });

    res.status(result.status).send(result.data);
  }

  async addUserToTournament(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { value, error: validationError } = addUserToTournamentValidation.validate(req.body, { abortEarly: false });

    if (validationError) return next({ data: validationError, status: 400 });

    const { result, error } = await tournamentServices.addUserToTournament(value);

    if (error) return next({ data: error.data, status: error.status });

    res.status(result.status).send(result.data);
  }

  async getTournamentsFilter(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { value, error: validationError } = getTournamentValidation.validate(req.query, { abortEarly: false });

    if (validationError) return next({ data: validationError, status: 400 });

    const { result, error } = await tournamentServices.getTournamentsFilter(value);

    if (error) return next({ data: error.data, status: error.status });

    res.status(result.status).send(result.data);
  }
}

export const tournamentController = new TournamentController();
