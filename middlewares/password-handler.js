const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UsersService = require('./../services/user');
const service = new UsersService();     

function asyncHandler(fn) {
    return function (req, res, next) {
        return Promise.resolve(fn(req, res, next)).catch(next);
    };
}

async function verifyPassword(req, res, next) {
    const { username, password } = req.body;

    const user = await service.findByUsername(username);

    if (!user) {
      return next(boom.forbidden('User not found'));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(boom.unauthorized('Wrong credentials'));
    }

    next();
}


module.exports = { asyncHandler, verifyPassword };