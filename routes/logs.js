const express = require('express');
const LogsService = require('./../services/log');

const validatorHandler = require('./../middlewares/validation-handler');
const { createLogSchema, updateLogSchema, getLogSchema, logFromUserPet } = require('./../schemas/log');

const router = express.Router({mergeParams: true});
const service = new LogsService();

router.get('/', 
    validatorHandler(logFromUserPet, 'params'),
    async (req, res, next) => {
    // #swagger.tags = ['Logs']
    // #swagger.summary = 'Get a list of logs from a user's pet
    try {
        const { userId, petId } = req.params;

        const result = await service.find(userId, petId);

        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});

router.get('/:logId', 
    validatorHandler(getLogSchema, 'params'),
    async (req, res, next) => {
    // #swagger.tags = ['Logs']
    // #swagger.summary = 'Get a log item
    try {
        const { userId, petId, logId } = req.params;

        result = await service.findOne(userId, petId, logId);

        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});

router.post('/', 
    validatorHandler(logFromUserPet, 'params'),
    validatorHandler(createLogSchema, 'body'),
    async (req, res, next) => {
    // #swagger.tags = ['Logs']
    // #swagger.summary = 'Create a log item for a user's pet
    try {
        const { userId, petId } = req.params;

        const data = req.body;

        const result = await service.create(userId, petId, data);

        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});

router.patch('/:logId', 
    validatorHandler(getLogSchema, 'params'),
    validatorHandler(updateLogSchema, 'body'),
    async (req, res, next) => {
    // #swagger.tags = ['Logs']
    // #swagger.summary = 'Update a log item
    try {
        const { userId, petId, logId } = req.params;
        const data = req.body;

        const result = await service.update(userId, petId, logId, data);

        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});

router.delete('/:logId', 
    validatorHandler(getLogSchema, 'params'),
    async (req, res, next) => {
    // #swagger.tags = ['Logs']
    // #swagger.summary = 'Delete a log item
    try {
        const { userId, petId, logId } = req.params;

        const result = await service.delete(userId, petId, logId);

        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});

module.exports = router;