const Model = require('../models/user');
const boom = require('@hapi/boom');

class PetsService {
	consctructor() { }

	async create(data, userId) {
	    const newPet = {
	        ...data,
	        created_at: new Date()
	    };

	    const user = await Model.findById(userId);

	    if (!user) {
	      throw boom.notFound('User not found');
	    }

	    user.pets.push(newPet);

	    await user.save();

	    return user.pets[user.pets.length - 1];
	}

	async find(userId) {
    	const user = await Model.findById(userId);

	    if (!user) {
	    	throw boom.notFound('User not found');
	    }

        return user.pets;
	}

	async findOne(userId, petId) {
	    const user = await Model.findById(userId);

	    if (!user) {
	      throw boom.notFound('User not found');
	    }

	    const pet = user.pets.id(petId);

	    if (!pet) {
	    	throw boom.notFound('Pet not found');
	    }

	    return pet;
	}

	async update(userId, petId, data) {
	    const user = await Model.findById(userId);

	    if (!user) {
	      	throw boom.notFound('User not found');
	    }

	    const pet = user.pets.id(petId);

	    if (!pet) {
	    	throw boom.notFound('Pet not found');
	    }

	    pet.set(data);
	    user.save();

	    return pet;
	}

	async delete(userId, petId) {
    	const user = await Model.findById(userId);

	    if (!user) {
	      	throw boom.notFound('User not found');
	    }

	    const pet = user.pets.id(petId);

	    if(!pet) {
	    	throw boom.notFound('Pet not found');
	    }

	    user.pets.pull(petId);
	    await user.save();

	    return pet;
	}

	async findAllPetsReminders(userId) {
    	const user = await Model.findById(userId);

	    if (!user) {
	      throw boom.notFound('User not found');
	    }

	    if (!user.pets) {
	    	throw boom.notFound('User without pets');
	    }

		const reminders = {
			current: [],
			past: []
		};

		const currentDate = new Date();

		user.pets?.map(pet => pet.reminders?.map(reminder => reminder.date.getTime() > currentDate.getTime() ? reminders.current.push(reminder) : reminders.past.push(reminder)));

        return reminders;
	}

}

module.exports = PetsService;
