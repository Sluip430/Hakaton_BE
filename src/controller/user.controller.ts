import { NextFunction, Request, Response } from 'express';
import {
  userByIdValidation,
} from '../middlewares/validation/user.validator';
import { userServices } from '../services/user.service';

export class UserController {
  async getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { value, error: validationError } = userByIdValidation.validate(req.query, { abortEarly: false });

    if (validationError) return next({ data: validationError, status: 400 });

    const { result, error } = await userServices.getUserById(value.id);

    if (error) return next({ data: error.data, status: error.status });

    res.status(result.status).send(result.data);
  }
}

export const userController = new UserController();
