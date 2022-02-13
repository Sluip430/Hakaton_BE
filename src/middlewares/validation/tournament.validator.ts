import Joi from 'joi';

export const createValidation = Joi.object().keys({
  name: Joi.string().min(2).required(),
  description: Joi.string().min(2).required(),
  mode: Joi.string().min(2).required(),
  place: Joi.string().min(2).required(),
  start_date: Joi.date().min(new Date()).required(),
  last_registration_date: Joi.date().min(new Date()).required(),
  level: Joi.string().min(2).required(),
  number_of_participants: Joi.number().min(2).required(),
  scenario: Joi.string().min(2).required(),
  players: Joi.number().min(2).required(),
});

export const addUserToTournamentValidation = Joi.object().keys({
  tournament_id: Joi.number().required(),
  user_id: Joi.number().required(),
});

export const getTournamentValidation = Joi.object().keys({
  id: Joi.number().positive(),
  status: Joi.string(),
  name: Joi.string().min(2),
  description: Joi.string().min(2),
  mode: Joi.string().min(2),
  place: Joi.string().min(2),
  start_date: Joi.date().min(new Date()),
  last_registration_date: Joi.date().min(new Date()),
  level: Joi.string().min(2),
  number_of_participants: Joi.number().min(2),
  scenario: Joi.string().min(2),
  players: Joi.number().min(2),
});
