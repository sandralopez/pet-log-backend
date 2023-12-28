const Joi = require('joi');

const commentId = Joi.string().hex().length(24);
const comment = Joi.string().min(3).max(512);
const created_at = Joi.string().isoDate();
const deleted = Joi.boolean();

const createCommentSchema = Joi.object({
	comment: comment.required()
});

const getCommentSchema = Joi.object({
	commentId: commentId.required(),
});


module.exports = { createCommentSchema, getCommentSchema };