const Model = require('../models/user');
const boom = require('@hapi/boom');

class TagsService {
	consctructor() { }

	async create(data, userId) {
	    const newTag = {
	        ...data,
	        created_at: new Date()
	    };

	    const user = await Model.findById(userId);

	    if (!user) {
	      throw boom.notFound('User not found');
	    }

		const tagExists = user.tags?.find(({ name }) => name === data.name );

        if (tagExists) {
        	throw boom.conflict('Tag already exists');
        }

	    user.tags.push(newTag);

	    await user.save();

	    return user.tags[user.tags.length - 1];
	}

	async find(userId) {
    	const user = await Model.findById(userId);

	    if (!user) {
	      throw boom.notFound('User not found');
	    }

        return user.tags;
	}

	async findOne(userId, tagId) {
	    const user = await Model.findById(userId);

	    if (!user) {
	      throw boom.notFound('User not found');
	    }

	    const tag = user.tags.id(tagId);

	    if (!tag) {
	    	throw boom.notFound('Tag not found');
	    }

	    return tag;
	}

	async update(userId, tagId, data) {
	    const user = await Model.findById(userId);

	    if (!user) {
	      	throw boom.notFound('User not found');
	    }

	    const tag = user.tags.id(tagId);

	    if (!tag) {
	    	throw boom.notFound('Tag not found');
	    }

	    tag.set(data);
	    user.save();

	    return tag;
	}

	async delete(userId, tagId) {
    	const user = await Model.findById(userId);

	    if (!user) {
	      	throw boom.notFound('User not found');
	    }

	    const tag = user.tags.id(tagId);

	    if(!tag) {
	    	throw boom.notFound('Tag not found');
	    }

	    user.tags.pull(tagId);
	    await user.save();

	    return tag;
	}
}

module.exports = TagsService;
