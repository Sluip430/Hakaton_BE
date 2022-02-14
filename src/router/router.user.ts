import { Router } from 'express';
import { routes } from '../constraint/routes';
import { authorizationController } from '../controller/authorization.controller';
import { userController } from '../controller/user.controller';

export const routerUser = Router();

routerUser.post(routes.SIGN_UP, authorizationController.signUp)
  .get(routes.CONFIRM_EMAIL, authorizationController.confirmEmail)
  .post(routes.ACCEPT_INVITATION, authorizationController.additionalInfo)
  .post(routes.SIGN_IN, authorizationController.signIn)
  .post(routes.FORGOT_PASSWORD, authorizationController.forgotPassword)
  .get(routes.MAIL_CHANGE_PASSWORD, authorizationController.mailChangePassword)
  .post(routes.CHANGE_PASSWORD, authorizationController.changePassword)
  .get(routes.GET_USER_PROFILE, userController.getUserById)
  .get(routes.GET_USERS, userController.getUsers);
