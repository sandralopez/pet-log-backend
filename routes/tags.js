const express = require('express');
const TagsService = require('./../services/tag');

const Model = require('../models/user');
const service = new TagsService();

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

router.get('/:tagId', async (req, res, next) => {
	try {
		const { userId, tagId } = req.params;
	
	    result = await service.findOne(userId, tagId);

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

router.patch('/:tagId', async (req, res, next) => {
	try {
		const { userId, tagId } = req.params;

        const data = req.body;

        const result = await service.update(userId, tagId, data);

        res.status(200).json(result);
	}
	catch (error) {
        next(error);
	}
});

router.delete('/:tagId', async (req, res, next) => {
    try{
    	const { userId, tagId } = req.params;

        const result = await service.delete(userId, tagId);

        res.status(200).json(result);
    }
    catch(error){
        next(error);
    }
});

module.exports = router;