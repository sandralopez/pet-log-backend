const express = require('express');
const PetsService = require('./../services/pet');

const Model = require('../models/user');
const service = new PetsService();

const router = express.Router({mergeParams: true});

router.get('/', async (req, res, next) => {
    try{
    	const { userId } = req.params;
    	
        const result = await service.find(userId);

        res.status(200).json(result);
    }
    catch(error){
        next(error);
    }
});

router.get('/:petId', async (req, res, next) => {
	try {
		const { userId, petId } = req.params;
	
	    result = await service.findOne(userId, petId);

        res.status(200).json(result);
	}
	catch (error) {
        next(error);
	}
});

router.post('/', async (req, res, next) => {
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

router.patch('/:petId', async (req, res, next) => {
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

router.delete('/:petId', async (req, res, next) => {
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