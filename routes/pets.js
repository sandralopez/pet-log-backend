const express = require('express');
const PetsService = require('./../services/pet');

const validatorHandler = require('./../middlewares/validation-handler');
const { createPetSchema, updatePetSchema, getPetSchema } = require('./../schemas/pet');

const Model = require('../models/user');
const service = new PetsService();

const router = express.Router({mergeParams: true});

router.get('/', async (req, res, next) => {
    // #swagger.tags = ['Pets']
    // #swagger.summary = 'Get a list of pets from a user'
    try{
    	const { userId } = req.params;
    	
        const result = await service.find(userId);

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
    // #swagger.summary = 'Get one pet from a user'
	try {
		const { userId, petId } = req.params;
	
	    result = await service.findOne(userId, petId);

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
    // #swagger.summary = 'Create a pet for a user'
	try {
		const { userId } = req.params;

        const data = req.body;

        const result = await service.create(data, userId);

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
    // #swagger.summary = 'Update a pet from a user'
	try {
		const { userId, petId } = req.params;

        const data = req.body;

        const result = await service.update(userId, petId, data);

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
    // #swagger.summary = 'Delete a pet from a user'
    try{
    	const { userId, petId } = req.params;

        const result = await service.delete(userId, petId);

        res.status(200).json(result);
    }
    catch(error){
        next(error);
    }
});

module.exports = router;