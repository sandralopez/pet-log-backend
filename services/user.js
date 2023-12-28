const Model = require('../models/user');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

class UsersService {
	consctructor() { }

	async create(data) {
		const hash = await bcrypt.hash(data.password, 10);

		const userExists = await Model.findOne({ username: data.username, deleted: false });

        if (userExists) {
        	throw boom.conflict('User already exists');
        }

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
		const result = await Model.findOne({ username: username, deleted: false }, '_id email username role created_at password');

		return result;
	}

	async findOne(userId) {
		const result = await Model.findById({ _id: userId, deleted: false }, '_id email username role created_at');

        if (!result) {
        	throw boom.notFound('User not found');
        }

		return result;
	}

	async update(userId, data) {
        const options = { new: true, select: '_id email username role created_at' };

        if (data.email) {
	        const result = await Model.findOneAndUpdate(
	            { _id: userId, deleted: false }, { email: data.email }, options
	        )
        }

        if (data.newPassword) {
        	const hash = await bcrypt.hash(data.newPassword, 10);

	        const result = await Model.findOneAndUpdate(
	            { _id: userId, deleted: false }, { password: hash }, options
	        )
        }

        if (!result) {
        	throw boom.notFound('User not found');
        }

        return result;
	}

	async delete(userId) {
		const options = { select: '_id email username role created_at' };

        const result = await Model.findOneAndUpdate({ _id: userId, deleted: false }, { deleted: true }, options);

        if (!result) {
        	throw boom.notFound('User not found');
        }

        return result;
	}

	async register(data) {
		const hash = await bcrypt.hash(data.password, 10);

		const userExists = await Model.findOne({ username: data.username, deleted: false });

        if (userExists) {
        	throw boom.conflict('User already exists');
        }

	    const newUser = new Model({
	        ...data,
	        password: hash,
	        role: "user",
	        created_at: new Date()
	    });

	    const user = await newUser.save();
		const result = user.toObject();
		delete result.password;

	    return result;
	}

	async findNotifications(userId) {
    	const user = await Model.findOne({ _id: userId, deleted: false });

	    if (!user) {
	      throw boom.notFound('User not found');
	    }

	    if (!user.pets) {
	    	throw boom.notFound('User without pets');
	    }

		const notifications = {
			threeDays: [],
			oneWeek: []
		};

		const currentDate = new Date();
		const inThreeDays = new Date(new Date(currentDate).setDate(currentDate.getDate() + 3));
		const inOneWeek = new Date(new Date(currentDate).setDate(currentDate.getDate() + 7));

		user.pets?.map(pet => 
						pet.reminders?.map(reminder =>  {
							const remainderObject = reminder.toObject();

							if (reminder.date >= currentDate && reminder.date <= inThreeDays) {
								notifications.threeDays.push({...remainderObject, petName: pet.name});
							}
							else if (reminder.date >= currentDate && reminder.date <= inOneWeek) {
								notifications.oneWeek.push({...remainderObject, petName: pet.name});
							}
						}
					));

        return notifications;
	}

	async updateNotifications(userId) {
	    const user = await Model.findOne({ _id: userId, deleted: false });

	    if (!user) {
	      	throw boom.notFound('User not found');
	    }

		const notifications = {
			threeDays: [],
			oneWeek: []
		};

		const currentDate = new Date();
		const inThreeDays = new Date(new Date(currentDate).setDate(currentDate.getDate() + 3));
		const inOneWeek = new Date(new Date(currentDate).setDate(currentDate.getDate() + 7));

		user.pets?.map(pet => 
						pet.reminders?.map(reminder =>  {
							const remainderObject = reminder.toObject();

							if (reminder.date >= currentDate && reminder.date <= inThreeDays) {
								if (!reminder.threeDaysNotified) {
									reminder.set({ threeDaysNotified: true });
								}

								notifications.threeDays.push({...remainderObject, petName: pet.name});
							} 
							else if (reminder.date >= currentDate && reminder.date <= inOneWeek) {
								if (!reminder.oneWeekNotified) {
									reminder.set({ oneWeekNotified: true });
								}

								notifications.oneWeek.push({...remainderObject, petName: pet.name});
							}
						}
					));

	    user.save();

	    return notifications;
	}
}

module.exports = UsersService;