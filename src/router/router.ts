import { Router } from 'express';
import { routes } from '../constraint/routes';
import { routerUser } from './router.user';
import { routerTournament } from './router.tournament';

export const router = Router();
router.use(routes.USER, routerUser);
router.use(routes.TOURNAMENT, routerTournament);
