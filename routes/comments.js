const express = require('express');
const CommentsService = require('./../services/comment');

const validatorHandler = require('./../middlewares/validation-handler');
const { createCommentSchema, getCommentSchema } = require('./../schemas/comment');

const router = express.Router();
const service = new CommentsService();

const { checkJWT } = require('./../middlewares/jwt-handler');
const { checkRoles } = require('./../middlewares/auth-handler');

router.get('/', 
    checkJWT,
    checkRoles('admin'),
    async (req, res, next) => {
    // #swagger.tags = ['Comments']
    // #swagger.summary = 'Get a list of comments from visitors
    /* #swagger.security = [{
               "bearerAuth": []
    }] */
    try {
        const result = await service.find();

        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});

router.get('/:commentId', 
    checkJWT,
    checkRoles('admin'),
    validatorHandler(getCommentSchema, 'params'),
    async (req, res, next) => {
    // #swagger.tags = ['Comments']
    // #swagger.summary = 'Get a comment
    /* #swagger.security = [{
               "bearerAuth": []
    }] */
    try {
        const { commentId } = req.params;

        result = await service.findOne(commentId);

        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});

router.post('/', 
    validatorHandler(createCommentSchema, 'body'),
    async (req, res, next) => {
    // #swagger.tags = ['Comments']
    // #swagger.summary = 'Create a comment
    /* #swagger.security = [{
               "bearerAuth": []
    }] */
    try {
        const data = req.body;

        const result = await service.create(data);

        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});

module.exports = router;