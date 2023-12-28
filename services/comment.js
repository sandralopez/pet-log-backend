const Model = require('../models/comment');
const User = require('../models/user');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

class CommentsService {
	consctructor() { }

	async create(userId, data) {
	    const user = await User.findOne({ _id: userId, deleted: false });

	    if (!user) {
	      throw boom.notFound('User not found');
	    }
	    
	    const newComment = new Model({
	        ...data,
	        user: userId,
	        created_at: new Date()
	    });

	    const result = await newComment.save();

	    return result;
	}

	async find(userId) {
	    const user = await User.findOne({ _id: userId, deleted: false });

	    if (!user) {
	      throw boom.notFound('User not found');
	    }

		const results = await Model.find({ deleted: false });

		return results;
	}

	async findOne(userId, commentId) {
	    const user = await User.findOne({ _id: userId, deleted: false });

	    if (!user) {
	      throw boom.notFound('User not found');
	    }

		const result = await Model.findOne({ _id: commentId, deleted: false });

        if (!result) {
        	throw boom.notFound('Comment not found');
        }

		return result;
	}
}

module.exports = CommentsService;