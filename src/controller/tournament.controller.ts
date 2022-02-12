import { NextFunction, Request, Response } from 'express';
import { authorizationServices } from '../services/authorization/authorization.services';
import { createValidation } from '../middlewares/validation/tournament.validator';

export class TournamentController {
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { value, error: validationError } = createValidation.validate(req.body, { abortEarly: false });

    if (validationError) return next({ data: validationError, status: 400 });

    const { result, error } = await authorizationServices.signIn(value);

    if (error) return next({ data: error.data, status: error.status });

    res.header('access-token', result.token);
    res.status(result.status).send(result.data);
  }
}

export const tournamentController = new TournamentController();
