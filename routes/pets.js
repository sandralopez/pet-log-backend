const express = require('express');
const PetsService = require('./../services/pet');

const validatorHandler = require('./../middlewares/validation-handler');
const { createPetSchema, updatePetSchema, getPetSchema } = require('./../schemas/pet');

const Model = require('../models/user');
const service = new PetsService();

const router = express.Router({mergeParams: true});

router.get('/', async (req, res, next) => {
    // #swagger.tags = ['Pets']
    // #swagger.summary = 'Get a list of pets from the current user'
    /* #swagger.security = [{
               "bearerAuth": []
    }] */
    try{
    	const user = req.user;
    	
        const result = await service.find(user.sub);

        res.status(200).json(result);
    }
    catch(error){
        next(error);
    }
});

router.get('/:petId', 
    validatorHandler(getPetSchema, 'params'),
    async (req, res, next) => {
    // #swagger.tags = ['Pets']
    // #swagger.summary = 'Get one pet from the current user'
    /* #swagger.security = [{
               "bearerAuth": []
    }] */
	try {
		const { petId } = req.params;

        const user = req.user;
	
	    result = await service.findOne(user.sub, petId);

        res.status(200).json(result);
	}
	catch (error) {
        next(error);
	}
});

router.post('/', 
    validatorHandler(createPetSchema, 'body'),
    async (req, res, next) => {
    // #swagger.tags = ['Pets']
    // #swagger.summary = 'Create a pet for the current user'
    /* #swagger.security = [{
               "bearerAuth": []
    }] */
	try {
		const { userId } = req.params;

        const user = req.user;

        const data = req.body;

        const result = await service.create(data, user.sub);

    	res.status(200).json(result);
	}
	catch (error) {
        next(error);
	}
});

router.patch('/:petId', 
    validatorHandler(getPetSchema, 'params'),
    validatorHandler(updatePetSchema, 'body'),
    async (req, res, next) => {
    // #swagger.tags = ['Pets']
    // #swagger.summary = 'Update a pet from the current user'
    /* #swagger.security = [{
               "bearerAuth": []
    }] */
	try {
		const { petId } = req.params;

        const user = req.user;

        const data = req.body;

        const result = await service.update(user.sub, petId, data);

        res.status(200).json(result);
	}
	catch (error) {
        next(error);
	}
});

router.delete('/:petId', 
    validatorHandler(getPetSchema, 'params'),
    async (req, res, next) => {
    // #swagger.tags = ['Pets']
    // #swagger.summary = 'Delete a pet from the current user'
    /* #swagger.security = [{
               "bearerAuth": []
    }] */
    try{
    	const { petId } = req.params;

        const user = req.user;

        const result = await service.delete(user.sub, petId);

        res.status(200).json(result);
    }
    catch(error){
        next(error);
    }
});

module.exports = router;