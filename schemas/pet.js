const Joi = require('joi');

const petId = Joi.string().hex().length(24);
const name = Joi.string().regex(/^[A-Za-z]+$/).min(3).max(128);
const species = Joi.string().regex(/^[A-Za-z]+$/).min(3).max(128);
const birthdate = Joi.date();
const image = Joi.string().uri().min(3).max(128);
const created_at = Joi.string().isoDate();

const createPetSchema = Joi.object({
	name: name.required(),
	species: species.required(),
	birthdate: birthdate.required(),
	image: image
});

const updatePetSchema = Joi.object({
	name: name,
	species: species,
	birthdate: birthdate,
	image: image
});

const getPetSchema = Joi.object({
	petId: petId.required(),
});

module.exports = { createPetSchema, updatePetSchema, getPetSchema };