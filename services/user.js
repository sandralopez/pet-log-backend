const Model = require('../models/user');

class UsersService {
	consctructor() { }

	async create(data) {
	    const newUser = new Model({
	        ...data,
	        created_at: new Date()
	    });

	    const result = await newUser.save();

	    return result;
	}

	async find() {
		const results = await Model.find();

		return results;
	}

	async findOne(userId) {
		const result = await Model.findById(userId);

        if (!result) {
        	throw new Error("Not found");
        }

		return result;
	}

	async update(userId, data) {
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            userId, data, options
        )

        if (!result) {
        	throw new Error("Not found");
        }

        return result;
	}

	async delete(userId) {
        const result = await Model.findByIdAndDelete(userId);

        if (!result) {
        	throw new Error("Not found");
        }

        return result;
	}
}

module.exports = UsersService;