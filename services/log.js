const Model = require('../models/log');
const User = require('../models/user');
const boom = require('@hapi/boom');

class LogsService {
	consctructor() { }

	async create(userId, petId, data) {
	    const user = await User.findById(userId);

	    if (!user) {
	      throw boom.notFound('User not found');
	    }

	    const pet = user.pets.id(petId);

	    if (!pet) {
	    	throw boom.notFound('Pet not found');
	    }

	    const newLog = new Model({
	        ...data,
	        pet: petId,
	        created_at: new Date()
	    });

	    const result = await newLog.save();

	    return result;
	}

	async find(userId, petId) {
	    const user = await User.findById(userId);

	    if (!user) {
	      throw boom.notFound('User not found');
	    }

	    const pet = user.pets.id(petId);

	    if (!pet) {
	    	throw boom.notFound('Pet not found');
	    }

		const results = await Model.find({ pet: petId });

		return results;
	}

	async findOne(userId, petId, logId) {
	    const user = await User.findById(userId);

	    if (!user) {
	      throw boom.notFound('User not found');
	    }

	    const pet = user.pets.id(petId);

	    if (!pet) {
	    	throw boom.notFound('Pet not found');
	    }

		const result = await Model.findById(logId);

        if (!result) {
        	throw boom.notFound('Log not found');
        }

		return result;
	}

	async update(userId, petId, logId, data) {
	    const user = await User.findById(userId);

	    if (!user) {
	      throw boom.notFound('User not found');
	    }

	    const pet = user.pets.id(petId);

	    if (!pet) {
	    	throw boom.notFound('Pet not found');
	    }

        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            logId, data, options
        )

        if (!result) {
        	throw boom.notFound('Log not found');
        }

        return result;
	}

	async delete(userId, petId, logId) {
	    const user = await User.findById(userId);

	    if (!user) {
	      throw boom.notFound('User not found');
	    }

	    const pet = user.pets.id(petId);

	    if (!pet) {
	    	throw boom.notFound('Pet not found');
	    }

        const result = await Model.findByIdAndDelete(logId);

        if (!result) {
        	throw boom.notFound('Log not found');
        }

        return result;
	}
}

module.exports = LogsService;
