const Joi = require('joi');

const userId = Joi.string().hex().length(24);
const email = Joi.string().email().min(3).max(128);
const username = Joi.string().alphanum().min(3).max(128);
const password = Joi.string().alphanum().min(3).max(128);
const created_at = Joi.string().isoDate();

const createUserSchema = Joi.object({
	email: email.required(),
	username: username.required(),
	password: password.required()
});

const updateUserSchema = Joi.object({
	email: email,
	username: username,
	password: password,
});

const getUserSchema = Joi.object({
	userId: userId.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };