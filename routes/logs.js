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
    // #swagger.summary = 'Get a list of logs from the current user's pet'
    /* #swagger.security = [{
               "bearerAuth": []
    }] */
    try {
        const { petId } = req.params;

        const { tag, minDate, maxDate, page, size } = req.query;

        const user = req.user;

        const index = page ? parseInt(page) : 1;
        const limit = size ? parseInt(size) : 10;

        const startIndex = (index - 1) * limit;

        const pagination = {
            limit: limit,
            startIndex : startIndex,
        }

        const filters = {
            tagId: tag,
            minDate: minDate,
            maxDate: maxDate
        };

        const result = await service.find(user.sub, petId, filters, pagination);
        const totalCount = await service.count(user.sub, petId, filters);
        const pageCount = Math.ceil(totalCount/pagination.limit);

        res.status(200).json({
            rows : result,
            totalCount: totalCount,
            pageCount: pageCount
        });
    }
    catch (error) {
        next(error);
    }
});

router.get('/:logId', 
    validatorHandler(getLogSchema, 'params'),
    async (req, res, next) => {
    // #swagger.tags = ['Logs']
    // #swagger.summary = 'Get a log item from the current user's pet'
    /* #swagger.security = [{
               "bearerAuth": []
    }] */
    try {
        const { petId, logId } = req.params;

        const user = req.user;

        result = await service.findOne(user.sub, petId, logId);

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
    // #swagger.summary = 'Create a log item for the current user's pet'
    /* #swagger.security = [{
               "bearerAuth": []
    }] */
    try {
        const { petId } = req.params;

        const user = req.user;

        const data = req.body;

        const result = await service.create(user.sub, petId, data);

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
    // #swagger.summary = 'Update a log item from the current user's pet'
    /* #swagger.security = [{
               "bearerAuth": []
    }] */
    try {
        const { petId, logId } = req.params;

        const user = req.user;

        const data = req.body;

        const result = await service.update(user.sub, petId, logId, data);

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
    // #swagger.summary = 'Delete a log item from the current user's pet'
    /* #swagger.security = [{
               "bearerAuth": []
    }] */
    try {
        const { petId, logId } = req.params;

        const user = req.user;

        const result = await service.delete(user.sub, petId, logId);

        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});

module.exports = router;