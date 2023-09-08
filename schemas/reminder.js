const Joi = require('joi');

const petId = Joi.string().hex().length(24);
const reminderId = Joi.string().hex().length(24);
const subject = Joi.string().min(3).max(128);
const detail = Joi.string().min(3).max(512);
const date = Joi.date();
const oneWeekNotified = Joi.boolean();
const threeDaysNotified = Joi.boolean();
const created_at = Joi.string().isoDate();

const createReminderSchema = Joi.object({
	petId: petId.required(),
	subject: subject.required(),
	detail: detail.required(),
	date: date.required()
});

const updateReminderSchema = Joi.object({
	petId: petId.required(),
	subject: subject,
	detail: detail,
	oneWeekNotified: oneWeekNotified,
	threeDaysNotified: threeDaysNotified,
	date: date
});

const getReminderSchema = Joi.object({
	petId: petId.required(),
	reminderId: reminderId.required(),
});

module.exports = { createReminderSchema, updateReminderSchema, getReminderSchema };