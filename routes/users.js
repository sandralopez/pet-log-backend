const express = require('express');
const UsersService = require('./../services/user');

const validatorHandler = require('./../middlewares/validation-handler');
const { createUserSchema, updateUserSchema, getUserSchema } = require('./../schemas/user');

const router = express.Router();
const service = new UsersService();

router.get('/', async (req, res, next) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Get a list of users'
    try {
        const result = await service.find();

        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});

router.get('/:userId', 
    validatorHandler(getUserSchema, 'params'),
    async (req, res, next) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Get one user'
    try {
        const { userId } = req.params;

        result = await service.findOne(userId);

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

router.patch('/:userId', 
    validatorHandler(getUserSchema, 'params'),
    validatorHandler(updateUserSchema, 'body'),
    async (req, res, next) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Update a user'
    try {
        const { userId } = req.params;
        const data = req.body;

        const result = await service.update(userId, data);

        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});

router.delete('/:userId', 
    validatorHandler(getUserSchema, 'params'),
    async (req, res, next) => {
    // #swagger.tags = ['Users']
    // #swagger.summary = 'Delete a user'
    try {
        const { userId } = req.params;

        const result = await service.delete(userId);

        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});

module.exports = router;