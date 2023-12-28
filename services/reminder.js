const Model = require('../models/user');
const boom = require('@hapi/boom');

class RemindersService {
	consctructor() { }

	async create(userId, petId, data) {
	    const newReminder = {
	        ...data,
	        oneWeekNotified: false,
	        threeDaysNotified: false,
	        created_at: new Date()
	    };

	    const user = await Model.findOne({ _id: userId, deleted: false });

	    if (!user) {
	      throw boom.notFound('User not found');
	    }

	    const pet = user.pets.find(pet => pet._id.equals(petId) && pet.deleted === false);

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
    	const user = await Model.findOne({ _id: userId, deleted: false });

	    if (!user) {
	      throw boom.notFound('User not found');
	    }

	    const pet = user.pets.find(pet => pet._id.equals(petId) && pet.deleted === false);

	    if (!pet) {
	    	throw boom.notFound('Pet not found');
	    }

	    return pet.reminders.filter( reminder => reminder.deleted === false );
	}

	async findOne(userId, petId, reminderId) {
	    const user = await Model.findOne({ _id: userId, deleted: false });

	    if (!user) {
	      throw boom.notFound('User not found');
	    }

	    const pet = user.pets.find(pet => pet._id.equals(petId) && pet.deleted === false);

	    if (!pet) {
	    	throw boom.notFound('Pet not found');
	    }

	    const reminder = pet.reminders.find(reminder => reminder._id.equals(reminderId) && reminder.deleted === false);

	    if (!reminder) {
	    	throw boom.notFound('Reminder not found');
	    }

	    return reminder;
	}

	async update(userId, petId, reminderId, data) {
	    const user = await Model.findOne({ _id: userId, deleted: false });

	    if (!user) {
	      	throw boom.notFound('User not found');
	    }

	    const pet = user.pets.find(pet => pet._id.equals(petId) && pet.deleted === false);

	    if (!pet) {
	    	throw boom.notFound('Pet not found');
	    }

	    const reminder = pet.reminders.find(reminder => reminder._id(reminderId) && reminder.deleted === false);

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
    	const user = await Model.findOne({ _id: userId, deleted: false });

	    if (!user) {
	      	throw boom.notFound('User not found');
	    }

	    const pet = user.pets.find(pet => pet._id.equals(petId) && pet.deleted === false);

	    if (!pet) {
	    	throw boom.notFound('Pet not found');
	    }

	    const reminder = pet.reminders.find(reminder => reminder._id.equals(reminderId) && reminder.deleted === false);

	    if(!reminder) {
	    	throw boom.notFound('Reminder not found');
	    }

	    reminder.set({ deleted: true });

	    await user.save();

	    return reminder;
	}
}

module.exports = RemindersService;
