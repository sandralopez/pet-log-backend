const Model = require('../models/log');

class LogsService {
	consctructor() { }

	async create(data) {
	    const newLog = new Model({
	        ...data,
	        created_at: new Date()
	    });

	    const result = await newLog.save();

	    return result;
	}

	async find() {
		const results = await Model.find();

		return results;
	}

	async findOne(logId) {
		const result = await Model.findById(logId);

        if (!result) {
        	throw new Error("Not found");
        }

		return result;
	}

	async update(logId, data) {
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            logId, data, options
        )

        if (!result) {
        	throw new Error("Not found");
        }

        return result;
	}

	async delete(logId) {
        const result = await Model.findByIdAndDelete(logId);

        if (!result) {
        	throw new Error("Not found");
        }

        return result;
	}
}

module.exports = LogsService;
