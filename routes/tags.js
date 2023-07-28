const express = require('express');
const TagsService = require('./../services/tag');

const validatorHandler = require('./../middlewares/validation-handler');
const { createTagSchema, updateTagSchema, getTagSchema } = require('./../schemas/tag');

const Model = require('../models/user');
const service = new TagsService();

const router = express.Router({mergeParams: true});

router.get('/', async (req, res, next) => {
    // #swagger.tags = ['Tags']
    // #swagger.summary = 'Get a list of tags from a user'
    try{
    	const { userId } = req.params;
    	
        const result = await service.find(userId);

        res.status(200).json(result);
    }
    catch(error){
        next(error);
    }
});

router.get('/:tagId', 
    validatorHandler(getTagSchema, 'params'),
    async (req, res, next) => {
    // #swagger.tags = ['Tags']
    // #swagger.summary = 'Get one tag from a user'
	try {
		const { userId, tagId } = req.params;
	
	    result = await service.findOne(userId, tagId);

        res.status(200).json(result);
	}
	catch (error) {
        next(error);
	}
});

router.post('/', 
    validatorHandler(createTagSchema, 'body'),
    async (req, res, next) => {
    // #swagger.tags = ['Tags']
    // #swagger.summary = 'Create a tag for a user'
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

router.patch('/:tagId', 
    validatorHandler(getTagSchema, 'params'),
    validatorHandler(updateTagSchema, 'body'),
    async (req, res, next) => {
    // #swagger.tags = ['Tags']
    // #swagger.summary = 'Update a tag from a user'
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

router.delete('/:tagId', 
    validatorHandler(getTagSchema, 'params'),
    async (req, res, next) => {
    // #swagger.tags = ['Tags']
    // #swagger.summary = 'Delete a tag from a user'
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