const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../../config/config');

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // de dónde va a sacar el token
	secretOrKey: config.jwtSecret
} 

const JwtStrategy = new Strategy(options, (payload, done) => {
	return done(null, payload);
});

module.exports = JwtStrategy;