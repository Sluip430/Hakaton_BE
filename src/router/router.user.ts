import { Router } from 'express';
import { routes } from '../constraint/routes';
import { authorizationController } from '../controller/authorization.controller';

export const routerUser = Router();

routerUser.post(routes.SIGN_UP, authorizationController.signUp);
routerUser.get(routes.CONFIRM_EMAIL, authorizationController.confirmEmail);
routerUser.post(routes.ACCEPT_INVITATION, authorizationController.additionalInfo);
routerUser.post(routes.SIGN_IN, authorizationController.signIn);
routerUser.post(routes.FORGOT_PASSWORD, authorizationController.forgotPassword);
routerUser.get(routes.MAIL_CHANGE_PASSWORD, authorizationController.mailChangePassword);
routerUser.post(routes.CHANGE_PASSWORD, authorizationController.changePassword);
