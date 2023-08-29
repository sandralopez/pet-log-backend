const express = require('express');
const usersRouter = require('./users');
const petsRouter = require('./pets');
const tagsRouter = require('./tags');
const logsRouter = require('./logs');
const commentsRouter = require('./comments');
const remindersRouter = require('./reminders');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger_output.json')
const authRouter = require('./auth');
const { checkJWT } = require('./../middlewares/jwt-handler');
const { checkRoles } = require('./../middlewares/auth-handler');

function routerApi(app) {
	const router = express.Router();

	app.use('/api/v1', router);
	
	router.use('/auth', authRouter);
	router.use('/users', 
				usersRouter
	);
	router.use('/users/me/pets',
				checkJWT,
				checkRoles('admin', 'user'),
				petsRouter
	);
	router.use('/users/me/tags', 
				checkJWT, 
				checkRoles('admin', 'user'),
				tagsRouter
	);
	router.use('/users/me/pets/:petId/logs', 
				checkJWT, 
				checkRoles('admin', 'user'),
				logsRouter
	);
	router.use('/users/me/pets/:petId/reminders', 
				checkJWT, 
				checkRoles('admin', 'user'),
				remindersRouter
	);
	router.use('/comments', 
				checkJWT,
				commentsRouter
	);
	router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))
}

module.exports = routerApi;