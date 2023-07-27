const Joi = require('joi');

const userId = Joi.string().hex().length(24);
const tagId = Joi.string().hex().length(24);
const name = Joi.string().regex(/^[A-Za-z]+$/).min(3).max(128);
const datatype = Joi.string().regex(/^[A-Za-z]+$/).min(3).max(128);
const measureUnit = Joi.string().alphanum().min(3).max(128);
const timeUnit = Joi.string().alphanum().min(3).max(128);
const created_at = Joi.string().isoDate();

const createTagSchema = Joi.object({
	name: name.required(),
	datatype: datatype.required(),
	measureUnit: measureUnit,
	timeUnit: timeUnit
});

const updateTagSchema = Joi.object({
	name: name,
	datatype: datatype,
	measureUnit: measureUnit,
	timeUnit: timeUnit
});

const getTagSchema = Joi.object({
	userId: userId.required(),
	tagId: tagId.required(),
});

module.exports = { createTagSchema, updateTagSchema, getTagSchema };