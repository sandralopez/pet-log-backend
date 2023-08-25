const express = require('express');
const CommentsService = require('./../services/comment');

const validatorHandler = require('./../middlewares/validation-handler');
const { createCommentSchema, getCommentSchema } = require('./../schemas/comment');

const router = express.Router();
const service = new CommentsService();

const { checkJWT } = require('./../middlewares/jwt-handler');
const { checkRoles } = require('./../middlewares/auth-handler');

router.get('/', 
    checkRoles('admin'),
    async (req, res, next) => {
    // #swagger.tags = ['Comments']
    // #swagger.summary = 'Get a list of comments from visitors
    /* #swagger.security = [{
               "bearerAuth": []
    }] */
    try {
        const user = req.user;

        const result = await service.find(user.sub);

        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});

router.get('/:commentId', 
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

        const user = req.user;

        result = await service.findOne(user.sub, commentId);

        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});

router.post('/', 
    checkRoles('admin', 'user'),
    validatorHandler(createCommentSchema, 'body'),
    async (req, res, next) => {
    // #swagger.tags = ['Comments']
    // #swagger.summary = 'Create a comment
    /* #swagger.security = [{
               "bearerAuth": []
    }] */
    try {
        const data = req.body;

        const user = req.user;

        const result = await service.create(user.sub, data);

        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});

module.exports = router;