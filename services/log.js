const Model = require('../models/log');
const User = require('../models/user');
const boom = require('@hapi/boom');
const mongoose = require('mongoose');

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
	        tag: data.tagId,
	        pet: petId,
	        user: userId,
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

		const results = await Model.aggregate([
											{ 
												$match: { 
													pet: 
														new mongoose.Types.ObjectId(petId), user:  
														new mongoose.Types.ObjectId(userId)
												} 
											},
										    {
										        $lookup: {
										            from: "users",
										            localField: "user",
										            foreignField: "_id",
										            as: "user"
										        }
    										},
    										{ $unwind: "$user" },
										    {
										        $addFields: {
										            tag: {
										                $arrayElemAt: [
										                    {
										                        $filter: {
										                            input: "$user.tags",
										                            as: "tag",
										                            cond: { $eq: ["$$tag._id", "$tag"] }
										                        }
										                    },
										                    0
										                ]
										            }
										        }
										    },
										    {
										        $project: {
										            _id: 1,
										            date: 1,
										            value: 1,
										            detail: 1,
										            created_at: 1,
										            tagId: "$tag._id",
										            tagName: "$tag.name",
										        }
										    }
						]);

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
