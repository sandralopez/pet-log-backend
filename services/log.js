const Model = require('../models/log');
const User = require('../models/user');
const boom = require('@hapi/boom');
const mongoose = require('mongoose');

class LogsService {
	consctructor() { }

	async create(userId, petId, data) {
	    const user = await User.findOne({ _id: userId, deleted: false });

	    if (!user) {
	      throw boom.notFound('User not found');
	    }

	    const pet = user.pets.find(pet => pet._id.equals(petId) && pet.deleted === false);

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

	async find(userId, petId, tagId, pagination) {
	    const user = await User.findOne({ _id: userId, deleted: false });

	    if (!user) {
	      throw boom.notFound('User not found');
	    }

	    const pet = user.pets.find(pet => pet._id.equals(petId) && pet.deleted === false);

	    if (!pet) {
	    	throw boom.notFound('Pet not found');
	    }

	    const filterTag = (tagId) ? [{ $match: { tag: new mongoose.Types.ObjectId(tagId) } }] : [];

		const results = await Model.aggregate([
											...filterTag,
											{ 
												$match: { 
													pet: 
														new mongoose.Types.ObjectId(petId), 
													user:  
														new mongoose.Types.ObjectId(userId),
													deleted:
														false
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
						])
						.sort({ date: 'desc', created_at: 'desc' })
						.skip(pagination.startIndex)
						.limit(pagination.limit);

		return results;
	}

	async findOne(userId, petId, logId) {
	    const user = await User.findOne({ _id: userId, deleted: false });

	    if (!user) {
	      throw boom.notFound('User not found');
	    }

	    const pet = user.pets.find(pet => pet._id.equals(petId) && pet.deleted === false);

	    if (!pet) {
	    	throw boom.notFound('Pet not found');
	    }

		const result = await Model.findOne({ _id: logId, deleted: false });

        if (!result) {
        	throw boom.notFound('Log not found');
        }

		return result;
	}

	async update(userId, petId, logId, data) {
	    const user = await User.findOne({ _id: userId, deleted: false });

	    if (!user) {
	      throw boom.notFound('User not found');
	    }

	    const pet = user.pets.find(pet => pet._id.equals(petId) && pet.deleted === false);

	    if (!pet) {
	    	throw boom.notFound('Pet not found');
	    }

        const options = { new: true };

        const result = await Model.findOneAndUpdate(
	            { _id: logId, deleted: false }, options
	        )

        if (!result) {
        	throw boom.notFound('Log not found');
        }

        return result;
	}

	async delete(userId, petId, logId) {
	    const user = await User.findOne({ _id: userId, deleted: false });

	    if (!user) {
	      throw boom.notFound('User not found');
	    }

	    const pet = user.pets.find(pet => pet._id.equals(petId) && pet.deleted === false);

	    if (!pet) {
	    	throw boom.notFound('Pet not found');
	    }

		const options = { select: '_id tag date value detail pet user created_at' };

        const result = await Model.findOneAndUpdate({ _id: logId, deleted: false }, { deleted: true }, options);

        if (!result) {
        	throw boom.notFound('Log not found');
        }

        return result;
	}

	async count(userId, petId, tagId) {
	    const user = await User.findOne({ _id: userId, deleted: false });

	    if (!user) {
	      throw boom.notFound('User not found');
	    }

	    const pet = user.pets.find(pet => pet._id.equals(petId) && pet.deleted === false);

	    if (!pet) {
	    	throw boom.notFound('Pet not found');
	    }

	    const conditions = {
	    	pet: petId,
	    	user: userId,
	    	deleted: false
	    }

	    if (tagId) {
	    	conditions.tag = tagId
	    }

	    const result = await Model.countDocuments(conditions);

	    return result;
	}
}

module.exports = LogsService;
