import Joi from 'joi';
import { regExp } from '../../configurations/regExp';
import {userRoleEnum} from "../../enum/user.enum";

export const signUpValidation = Joi.object().keys({
  login: Joi.string().min(2).alphanum().required(),
  email: Joi.string().min(2).regex(regExp.EMAIL).required(),
  password: Joi.string().min(2).regex(regExp.CHECK_PASSWORD).required(),
});

export const signInValidation = Joi.object().keys({
  login: Joi.string().min(2).alphanum().required(),
  password: Joi.string().min(2).required(),
});

export const queryTokenValidation = Joi.object().keys({
  token: Joi.string().min(2).required(),
});

export const additionalInfoValidation = Joi.object().keys({
  first_name: Joi.string().min(2).required(),
  last_name: Joi.string().min(2),
  date_of_birthday: Joi.date().required(),
  gender: Joi.string().min(2).required(),
});

export const emailValidation = Joi.object().keys({
  email: Joi.string().min(2).required(),
});

export const passwordValidation = Joi.object().keys({
  password: Joi.string().min(2).required(),
});

export const userByIdValidation = Joi.object().keys({
  id: Joi.number().required(),
});

export const userValidation = Joi.object().keys({
  id: Joi.number(),
  login: Joi.string().min(2),
  email: Joi.string().min(2),
  role: Joi.string().min(2),
  first_name: Joi.string().min(2),
  last_name: Joi.string().min(2),
  gender: Joi.string().min(2),
  games: Joi.number(),
  wins: Joi.number(),
  draws: Joi.number(),
  loses: Joi.number(),
  cup_wins: Joi.number(),
});
