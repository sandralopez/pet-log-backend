const Model = require('../models/comment');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

class CommentsService {
	consctructor() { }

	async create(data) {
	    const newComment = new Model({
	        ...data,
	        created_at: new Date()
	    });

	    const result = await newComment.save();

	    return result;
	}

	async find() {
		const results = await Model.find();

		return results;
	}

	async findOne(commentId) {
		const result = await Model.findById(commentId);

        if (!result) {
        	throw boom.notFound('Comment not found');
        }

		return result;
	}
}

module.exports = CommentsService;