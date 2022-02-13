import Joi from 'joi';
import { regExp } from '../../configurations/regExp';

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
