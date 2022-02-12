import { Router } from 'express';
import { routes } from '../constraint/routes';
import { tournamentController } from '../controller/tournament.controller';

export const routerTournament = Router();

routerTournament
  .post(routes.CREATE, tournamentController.create)
  .post(routes.ADD_USER_TO_TOURNAMENT, tournamentController.addUserToTournament)
  .get(routes.GET_TOURNAMENT, tournamentController.getTournament);
