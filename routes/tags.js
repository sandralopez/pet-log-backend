const express = require('express');
const TagsService = require('./../services/tag');

const validatorHandler = require('./../middlewares/validation-handler');
const { createTagSchema, updateTagSchema, getTagSchema } = require('./../schemas/tag');

const Model = require('../models/user');
const service = new TagsService();

const router = express.Router({mergeParams: true});

router.get('/', async (req, res, next) => {
    // #swagger.tags = ['Tags']
    // #swagger.summary = 'Get a list of tags from the current user'
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

router.get('/:tagId', 
    validatorHandler(getTagSchema, 'params'),
    async (req, res, next) => {
    // #swagger.tags = ['Tags']
    // #swagger.summary = 'Get one tag from the current user'
    /* #swagger.security = [{
               "bearerAuth": []
    }] */
	try {
		const { tagId } = req.params;

        const user = req.user;
	
	    result = await service.findOne(user.sub, tagId);

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
    // #swagger.summary = 'Create a tag for the current user'
    /* #swagger.security = [{
               "bearerAuth": []
    }] */
	try {
		const user = req.user;

        const data = req.body;

        const result = await service.create(data, user.sub);

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
    // #swagger.summary = 'Update a tag from the current user'
    /* #swagger.security = [{
               "bearerAuth": []
    }] */
	try {
		const { tagId } = req.params;

        const user = req.user;

        const data = req.body;

        const result = await service.update(user.sub, tagId, data);

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
    // #swagger.summary = 'Delete a tag from the current user'
    /* #swagger.security = [{
               "bearerAuth": []
    }] */
    try{
    	const { tagId } = req.params;

        const user = req.user;

        const result = await service.delete(user.sub, tagId);

        res.status(200).json(result);
    }
    catch(error){
        next(error);
    }
});

module.exports = router;