const Joi = require('joi');

const petId = Joi.string().hex().length(24);
const logId = Joi.string().hex().length(24);
const tagId = Joi.string().hex().length(24);
const date = Joi.date();
const value = Joi.string().alphanum().min(0).max(128);
const detail = Joi.string().alphanum().min(0).max(1000);
const created_at = Joi.string().isoDate();
const deleted = Joi.boolean();

const createLogSchema = Joi.object({
	petId: petId.required(),
	tagId: tagId.required(),
	date: date.required(),
	value: value.required(),
	detail: detail.required()
});

const updateLogSchema = Joi.object({
	petId: petId.required(),
	tagId: tagId,
	date: date,
	value: value,
	detail: detail
});

const logFromUserPet = Joi.object({
	petId: petId.required()
});

const getLogSchema = Joi.object({
	petId: petId.required(),
	logId: logId.required()
});

module.exports = { createLogSchema, updateLogSchema, getLogSchema, logFromUserPet };