const express = require('express');
const RemindersService = require('./../services/reminder');

const validatorHandler = require('./../middlewares/validation-handler');
const { createReminderSchema, updateReminderSchema, getReminderSchema } = require('./../schemas/reminder');

const Model = require('../models/user');
const service = new RemindersService();

const router = express.Router({mergeParams: true});

router.get('/', async (req, res, next) => {
    // #swagger.tags = ['Reminders']
    // #swagger.summary = Get a list of reminders from the current user's pet
    /* #swagger.security = [{
               "bearerAuth": []
    }] */
    try {
        const { petId } = req.params;

    	const user = req.user;
    	
        const result = await service.find(user.sub, petId);

        res.status(200).json(result);
    }
    catch(error){
        next(error);
    }
});

router.get('/:reminderId', 
    async (req, res, next) => {
    // #swagger.tags = ['Reminders']
    // #swagger.summary = Get one reminder from the current user's pet
    /* #swagger.security = [{
               "bearerAuth": []
    }] */
	try {
		const { petId, reminderId } = req.params;

        const user = req.user;
	
	    result = await service.findOne(user.sub, petId, reminderId);

        res.status(200).json(result);
	}
	catch (error) {
        next(error);
	}
});

router.post('/', 
    validatorHandler(createReminderSchema, 'body'),
    async (req, res, next) => {
    // #swagger.tags = ['Reminders']
    // #swagger.summary = Create a reminder for the current user's pet
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

router.patch('/:reminderId', 
    validatorHandler(getReminderSchema, 'params'),
    validatorHandler(updateReminderSchema, 'body'),
    async (req, res, next) => {
    // #swagger.tags = ['Reminders']
    // #swagger.summary = Update a reminder from the current user's pet
    /* #swagger.security = [{
               "bearerAuth": []
    }] */
	try {
		const { petId, reminderId } = req.params;

        const user = req.user;

        const data = req.body;

        const result = await service.update(user.sub, petId, reminderId, data);

        res.status(200).json(result);
	}
	catch (error) {
        next(error);
	}
});

router.delete('/:reminderId', 
    validatorHandler(getReminderSchema, 'params'),
    async (req, res, next) => {
    // #swagger.tags = ['Reminders']
    // #swagger.summary = Delete a reminder from the current user's pet
    /* #swagger.security = [{
               "bearerAuth": []
    }] */
    try{
    	const { petId, reminderId } = req.params;

        const user = req.user;

        const result = await service.delete(user.sub, petId, reminderId);

        res.status(200).json(result);
    }
    catch(error){
        next(error);
    }
});

module.exports = router;