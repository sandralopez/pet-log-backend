const boom = require('@hapi/boom');

const { config } = require('./../config/config');

function checkApiKey(req, res, next) {
	const apiKey = req.headers['api'];

	if (apiKey === config.apiKey) {
		next();
	} 
	else {
		next(boom.unauthorized('Invalid API key'));
	}
}

function checkRoles(...roles) {
	return (req, res, next) => {
		const user = req.user;

		if (roles.includes(user.role)) {
			next();
		}
		else {
			next(boom.forbidden('Permission denied'));
		}
	}
}

function checkRefreshCookie(req, res, next) {
	if (req.cookies?.jwt) {
		next();
	}
	else {
		next(boom.forbidden('Refresh token not found'));
	}
}

module.exports = { checkApiKey, checkRoles, checkRefreshCookie };