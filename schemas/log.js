const Joi = require('joi');

const id = Joi.string().hex().length(24);
const date = Joi.date();
const value = Joi.string().alphanum().min(0).max(128);
const detail = Joi.string().alphanum().min(0).max(1000);
const pet = Joi.string().hex().length(24);
const created_at = Joi.string().isoDate();

const createLogSchema = Joi.object({
	date: date.required(),
	value: value.required(),
	detail: detail.required(),
	pet: pet.required()
});

const updateLogSchema = Joi.object({
	date: date,
	value: value,
	detail: detail,
	pet: pet,
});

const getLogSchema = Joi.object({
	id: id.required(),
});

module.exports = { createLogSchema, updateLogSchema, getLogSchema };