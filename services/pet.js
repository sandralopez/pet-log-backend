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

	    return user.pets;
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
}

module.exports = PetsService;
