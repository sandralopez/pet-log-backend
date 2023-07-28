const express = require('express');
const usersRouter = require('./users');
const petsRouter = require('./pets');
const tagsRouter = require('./tags');
const logsRouter = require('./logs');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger_output.json')

function routerApi(app) {
	const router = express.Router();
	app.use('/api/v1', router);
	
	router.use('/users', usersRouter);
	router.use('/users/:userId/pets', petsRouter);
	router.use('/users/:userId/tags', tagsRouter);
	router.use('/users/:userId/pets/:petId/logs', logsRouter);
	router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
}

module.exports = routerApi;