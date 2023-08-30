const Model = require('../models/user');
const boom = require('@hapi/boom');

class RemindersService {
	consctructor() { }

	async create(userId, petId, data) {
	    const newReminder = {
	        ...data,
	        created_at: new Date()
	    };

	    const user = await Model.findById(userId);

	    if (!user) {
	      throw boom.notFound('User not found');
	    }

	    const pet = user.pets.id(petId);

	    if (!pet) {
	    	throw boom.notFound('Pet not found');
	    }

	    pet.reminders.push(newReminder);

	    await user.save();

	    const reminder = {
	    	...pet.reminders[pet.reminders.length - 1].toObject(),
	    	petId: pet._id,
	    	petName: pet.name
	    }

	    return reminder;
	}

	async find(userId, petId) {
    	const user = await Model.findById(userId);

	    if (!user) {
	      throw boom.notFound('User not found');
	    }

	    const pet = user.pets.id(petId);

	    if (!pet) {
	    	throw boom.notFound('Pet not found');
	    }

        return pet.reminders;
	}

	async findOne(userId, petId, reminderId) {
	    const user = await Model.findById(userId);

	    if (!user) {
	      throw boom.notFound('User not found');
	    }

	    const pet = user.pets.id(petId);

	    if (!pet) {
	    	throw boom.notFound('Pet not found');
	    }

	    const reminder = pet.reminders.id(reminderId);

	    if (!reminder) {
	    	throw boom.notFound('Reminder not found');
	    }

	    return reminder;
	}

	async update(userId, petId, reminderId, data) {
	    const user = await Model.findById(userId);

	    if (!user) {
	      	throw boom.notFound('User not found');
	    }

	    const pet = user.pets.id(petId);

	    if (!pet) {
	    	throw boom.notFound('Pet not found');
	    }

	    const reminder = pet.reminders.id(reminderId);

	    if (!reminder) {
	    	throw boom.notFound('Reminder not found');
	    }

	    reminder.set(data);
	    
	    user.save();

	    reminder.petId = pet._id;
	    reminder.petName = pet.name;

	    return reminder;
	}

	async delete(userId, petId, reminderId) {
    	const user = await Model.findById(userId);

	    if (!user) {
	      	throw boom.notFound('User not found');
	    }

	    const pet = user.pets.id(petId);

	    if (!pet) {
	    	throw boom.notFound('Pet not found');
	    }

	    const reminder = pet.reminders.id(reminderId);

	    if(!reminder) {
	    	throw boom.notFound('Reminder not found');
	    }

	    pet.reminders.pull(reminderId);

	    await user.save();

	    return reminder;
	}
}

module.exports = RemindersService;
