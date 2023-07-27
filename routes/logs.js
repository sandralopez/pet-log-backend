const express = require('express');
const LogsService = require('./../services/log');

const validatorHandler = require('./../middlewares/validation-handler');
const { createLogSchema, updateLogSchema, getLogSchema } = require('./../schemas/log');

const router = express.Router();
const service = new LogsService();

router.get('/', async (req, res, next) => {
    try {
        const result = await service.find();

        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});

router.get('/:id', 
    validatorHandler(getLogSchema, 'params'),
    async (req, res, next) => {
    try {
        const { id } = req.params;

        result = await service.findOne(id);

        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});

router.post('/', 
    validatorHandler(createLogSchema, 'body'),
    async (req, res, next) => {
    try {
        const data = req.body;

        const result = await service.create(data);

        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});

router.patch('/:id', 
    validatorHandler(getLogSchema, 'params'),
    validatorHandler(updateLogSchema, 'body'),
    async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const result = await service.update(id, data);

        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});

router.delete('/:id', 
    validatorHandler(getLogSchema, 'params'),
    async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await service.delete(id);

        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});

module.exports = router;