import { NextFunction, Request, Response } from 'express';
import {
  addUserToTournamentValidation,
  createValidation, getChampionshipMatchesForUser,
  getTournamentValidation, tournamentValidation, matchResultValidator,
} from '../middlewares/validation/tournament.validator';
import { tournamentServices } from '../services/tournament.services';
import { userRepository } from '../repository/user.repository';

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

  async startTournament(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { value, error: validationError } = tournamentValidation.validate(req.body, { abortEarly: false });

    if (validationError) return next({ data: validationError, status: 400 });

    const { result, error } = await tournamentServices.startTournament(value);

    if (error) return next({ data: error.data, status: error.status });

    res.status(result.status).send(result.data);
  }

  async getChampionshipMatchesForUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { value, error: validationError } = getChampionshipMatchesForUser.validate(req.query, { abortEarly: false });

    if (validationError) return next({ data: validationError, status: 400 });

    const { result, error } = await tournamentServices.getChampionshipMatchesForUser(value);

    if (error) return next({ data: error.data, status: error.status });

    res.status(result.status).send(result.data);
  }

  async getChampionshipStatistic(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { value, error: validationError } = tournamentValidation.validate(req.query, { abortEarly: false });

    if (validationError) return next({ data: validationError, status: 400 });

    const { result, error } = await tournamentServices.getChampionshipStatistic(value);

    if (error) return next({ data: error.data, status: error.status });

    res.status(result.status).send(result.data);
  }

  async setChampMatchResult(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { value, error: validationError } = matchResultValidator.validate(req.body, { abortEarly: false });

    if (validationError) return next({ data: validationError, status: 400 });

    const { result, error } = await tournamentServices.setChampMatchResult(value);

    if (error) return next({ data: error.data, status: error.status });

    res.status(result.status).send(result.data);
  }

  async getChampionshipTable(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { value, error: validationError } = tournamentValidation.validate(req.query, { abortEarly: false });

    if (validationError) return next({ data: validationError, status: 400 });

    const { result, error } = await tournamentServices.getChampionshipTable(value);

    if (error) return next({ data: error.data, status: error.status });

    res.status(result.status).send(result.data);
  }

  async getChampionshipMatchesByUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { value, error: validationError } = getChampionshipMatchesForUser.validate(req.query, { abortEarly: false });

    if (validationError) return next({ data: validationError, status: 400 });

    const { result, error } = await tournamentServices.getChampionshipMatchesByUser(value);

    if (error) return next({ data: error.data, status: error.status });

    res.status(result.status).send(result.data);
  }
}

export const tournamentController = new TournamentController();
