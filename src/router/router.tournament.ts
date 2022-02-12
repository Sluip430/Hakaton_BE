import { Router } from 'express';
import { routes } from '../constraint/routes';
import { authorizationController } from '../controller/authorization.controller';

export const routerTournament = Router();

routerTournament.post(routes.CREATE, authorizationController.signUp);
