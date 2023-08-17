const passport = require('passport');
const boom = require('@hapi/boom');

function checkJWT(req, res, next) {
	passport.authenticate('jwt', { session: false }, (err, payload, info) => {
		if (info && info.name === "TokenExpiredError") {
			return next(boom.unauthorized('Token expired'));
		}

		if (!payload) {
			return next(boom.unauthorized('Authentication failed'));
		}

		if (err) {
			return next(err);
		}

		req.user = payload;

		next();
    })(req, res, next);
}

module.exports = { checkJWT };