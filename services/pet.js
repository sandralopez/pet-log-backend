const Model = require('../models/user');
const boom = require('@hapi/boom');

class PetsService {
	consctructor() { }

	async create(data, userId) {
	    const newPet = {
	        ...data,
	        created_at: new Date()
	    };

	    const user = await Model.findOne({ _id: userId, deleted: false });

	    if (!user) {
	      throw boom.notFound('User not found');
	    }

	    user.pets.push(newPet);

	    await user.save();

	    return user.pets[user.pets.length - 1];
	}

	async find(userId) {
    	const user = await Model.findOne({ _id: userId, deleted: false });

	    if (!user) {
	    	throw boom.notFound('User not found');
	    }

	    const pets = user.pets.filter(pet => pet.deleted === false);

        return pets;
	}

	async findOne(userId, petId) {
	    const user = await Model.findOne({ _id: userId, deleted: false });

	    if (!user) {
	      throw boom.notFound('User not found');
	    }

	    const pet = user.pets.find(pet => pet._id.equals(petId) && pet.deleted === false);

	    if (!pet) {
	    	throw boom.notFound('Pet not found');
	    }

	    return pet;
	}

	async update(userId, petId, data) {
	    const user = await Model.findOne({ _id: userId, deleted: false });

	    if (!user) {
	      	throw boom.notFound('User not found');
	    }

	    const pet = user.pets.find(pet => pet._id.equals(petId) && pet.deleted === false);

	    if (!pet) {
	    	throw boom.notFound('Pet not found');
	    }

	    pet.set(data);
	    user.save();

	    return pet;
	}

	async delete(userId, petId) {
    	const user = await Model.findOne({ _id: userId, deleted: false });

	    if (!user) {
	      	throw boom.notFound('User not found');
	    }

	    const pet = user.pets.find(pet => pet._id.equals(petId) && pet.deleted === false);

	    if(!pet) {
	    	throw boom.notFound('Pet not found');
	    }

	    pet.set({ deleted : true });

	    await user.save();

	    return pet;
	}

	async findAllPetsReminders(userId) {
    	const user = await Model.findOne({ _id: userId, deleted: false });

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

		user.pets?.filter(pet => pet.deleted === false)
				  .map(pet => 
						pet.reminders?.filter(reminder => reminder.deleted === false)
									  .map(reminder =>  {
											const remainderObject = reminder.toObject();

											reminder.date > currentDate
												? reminders.current.push({...remainderObject, petId: pet._id, petName: pet.name}) 
												: reminders.past.push({...remainderObject, petId: pet._id, petName: pet.name});
						}
					));

        return reminders;
	}
}

module.exports = PetsService;
