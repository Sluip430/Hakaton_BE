import { NextFunction, Request, Response } from 'express';
import {
  additionalInfoValidation,
  emailValidation, passwordValidation,
  queryTokenValidation, signInValidation,
  signUpValidation,
} from '../middlewares/validation/user.validator';
import { authorizationServices } from '../services/authorization/authorization.services';
import { redirect } from '../constraint/redirect';

export class AuthorizationController {
  async signIn(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { value, error: validationError } = signInValidation.validate(req.body, { abortEarly: false });

    if (validationError) return next({ data: validationError, status: 400 });

    const { result, error } = await authorizationServices.signIn(value);

    if (error) return next({ data: error.data, status: error.status });

    res.header('access-token', result.token);
    res.status(result.status).send({ data: result.data, status: result.status });
  }
  async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { value, error: validationError } = emailValidation.validate(req.body, { abortEarly: false });

    if (validationError) return next({ data: validationError, status: 400 });

    const { result, error } = await authorizationServices.forgotPassword(value);

    if (error) return next({ data: error.data, status: error.status });

    res.status(result.status).send(result);
  }
  async mailChangePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { value, error: validationError } = queryTokenValidation.validate(req.query, { abortEarly: false });

    if (validationError) return next({ data: validationError, status: 400 });

    const { result, error } = await authorizationServices.mailChangePassword(value);

    if (error) return res.redirect(redirect.EMAIL_FORGOT_ERROR);

    res.setHeader('confirmation-token', result.data);
    res.redirect(`${redirect.EMAIL_FORGOT_SUCCESS}?token=${result.data}`);
  }
  async changePassword(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { value, error: validationError } = passwordValidation.validate(req.body, { abortEarly: false });

    if (validationError) return next({ data: validationError, status: 400 });
    const { result, error } = await authorizationServices.changePassword(value, req.headers.token as string);

    if (error) return next({ data: error.data, status: error.status });

    res.status(result.status).send(result);
  }
  async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { value, error: validationError } = signUpValidation.validate(req.body, { abortEarly: false });

    if (validationError) return next({ data: validationError.details[0].message, status: 400 });

    const { result, error } = await authorizationServices.signUp(value);

    if (error) return next({ data: error.data, status: error.status });

    res.status(201).send(result);
  }
  async confirmEmail(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { value, error } = queryTokenValidation.validate(req.query, { abortEarly: false });

    if (error) return next({ data: error.details[0].message, status: 400 });

    const result = await authorizationServices.confirmEmail(value);

    if (result) {
      res.setHeader('confirmation-token', value.token);
      res.redirect(`${redirect.EMAIL_CONF_SUCCESS}?token=${value.token}`);
    } else {
      res.redirect(redirect.EMAIL_CONF_ERROR);
    }
  }
  async additionalInfo(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { value, error: validationError } = additionalInfoValidation.validate(req.body, { abortEarly: false });

    if (validationError) return next({ data: validationError, status: 400 });

    const { result, error } = await authorizationServices.additionalInfo(value, req.headers.token);

    if (error) return next({ data: error.data, status: error.status });

    res.header('access-token', result.token);
    res.status(result.status).send(result);
  }
}

export const authorizationController = new AuthorizationController();
