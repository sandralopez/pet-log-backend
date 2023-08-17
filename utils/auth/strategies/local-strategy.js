const { Strategy } = require('passport-local');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UserService = require('./../../../services/user');

const service = new UserService();

const LocalStrategy = new Strategy(async (username, password, done) => {
	try {
		const user = await service.findByUsername(username);

		if (!user) {
			done(boom.unauthorized('User not found'), false);
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			done(boom.unauthorized('Wrong credentials'), false);
		}

		const { password: passwd, created_at, pets, tags, ...result} = user.toObject();

		done(null, result);
	}
	catch(error) {
		done(error, false);
	}
});

module.exports = LocalStrategy;