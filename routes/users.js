const express = require('express');
const boom = require('@hapi/boom');
const UsersService = require('./../services/user');

const validatorHandler = require('./../middlewares/validation-handler');
const { asyncHandler, verifyPassword } = require('./../middlewares/password-handler');
const { checkJWT } = require('./../middlewares/jwt-handler');
const { checkRoles } = require('./../middlewares/auth-handler');
const { createUserSchema, updateUserSchema } = require('./../schemas/user');

const router = express.Router();
const service = new UsersService();

router.get('/', 
    checkJWT,
    checkRoles('admin'),
    async (req, res, next) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Get a list of users'
    /* #swagger.security = [{
               "bearerAuth": []
    }] */
    try {
        const result = await service.find();

        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});

router.get('/me', 
    checkJWT,
    checkRoles('admin', 'user'),
    async (req, res, next) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Get current user'
    /* #swagger.security = [{
               "bearerAuth": []
    }] */
    try {
        const user = req.user;

        result = await service.findOne(user.sub);

        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});

router.post('/', 
    validatorHandler(createUserSchema, 'body'),
    async (req, res, next) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Create a user'
    try {
        const data = req.body;

        const result = await service.create(data);

    	res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});

router.patch('/me', 
    checkJWT,
    checkRoles('admin', 'user'),
    asyncHandler(verifyPassword),
    validatorHandler(updateUserSchema, 'body'),
    async (req, res, next) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Update current user'
    /* #swagger.security = [{
               "bearerAuth": []
    }] */
    try {
        const user = req.user;

        const data = req.body;

        if (data.newPassword && data.repeatPassword && data.newPassword != data.repeatPassword) {
            throw boom.badRequest('Passwords do not match');
        }

        const result = await service.update(user.sub, data);

        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});

router.delete('/me', 
    checkJWT,
    checkRoles('admin', 'user'),
    async (req, res, next) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Delete current user'
    /* #swagger.security = [{
               "bearerAuth": []
    }] */
    try {
        const user = req.user;

        const result = await service.delete(user.sub);

        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});

module.exports = router;