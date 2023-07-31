const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UserService = require('./../../../services/user');

const service = new UserService();

const LocalStrategy = new Strategy(async (username, password, done) => {
	try {
		const user = await service.findByEmail(username);

		if (!user) {
			done(boom.unauthorized(), false);
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			done(boom.unauthorized(), false);
		}

		const result = user.toObject();
		
		result._id = result._id.toString();
		delete result.password; 

		done(null, result);
	}
	catch(error) {
		done(error, false);
	}
});

module.exports = LocalStrategy;