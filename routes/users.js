const express = require('express');
const UsersService = require('./../services/user');

const router = express.Router();
const service = new UsersService();

router.get('/', async (req, res, next) => {
    try {
        const result = await service.find();

        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        result = await service.findOne(id);

        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const data = req.body;

        const result = await service.create(data);

    	res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});

router.patch('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const result = await service.update(id, data);

        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        const result = await service.delete(id);

        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
});

module.exports = router;