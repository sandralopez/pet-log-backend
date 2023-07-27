const express = require('express');
const usersRouter = require('./users');
const petsRouter = require('./pets');
const tagsRouter = require('./tags');
const logsRouter = require('./logs');

function routerApi(app) {
	const router = express.Router();
	app.use('/api/v1', router);
	router.use('/users', usersRouter);
	router.use('/users/:userId/pets', petsRouter);
	router.use('/users/:userId/tags', tagsRouter);
	router.use('/logs', logsRouter);
}

module.exports = routerApi;