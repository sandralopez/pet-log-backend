const Model = require('../models/user');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

class UsersService {
	consctructor() { }

	async create(data) {
		const hash = await bcrypt.hash(data.password, 10);

	    const newUser = new Model({
	        ...data,
	        password: hash,
	        created_at: new Date()
	    });

	    const user = await newUser.save();
		const result = user.toObject();
		delete result.password;

	    return result;
	}

	async find() {
		const results = await Model.find();

		return results;
	}

	async findByUsername(username) {
		const result = await Model.findOne({ username: username });
		
		return result;
	}

	async findOne(userId) {
		const result = await Model.findById(userId, '_id email username role created_at');

        if (!result) {
        	throw boom.notFound('User not found');
        }

		return result;
	}

	async update(userId, data) {
        const options = { new: true, select: '_id email username role created_at' };

        const result = await Model.findByIdAndUpdate(
            userId, data, options
        )

        if (!result) {
        	throw boom.notFound('User not found');
        }

        return result;
	}

	async delete(userId) {
		const options = { select: '_id email username role created_at' };

        const result = await Model.findByIdAndDelete(userId, options);

        if (!result) {
        	throw boom.notFound('User not found');
        }

        return result;
	}
}

module.exports = UsersService;