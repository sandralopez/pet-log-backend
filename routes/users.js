const express = require('express');
const Model = require('../models/user');

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const results = await Model.find();
        res.json(results);
    }
    catch(error){
        if (error.name === "ValidationError") {
            res.status(400).json({message: error.message})
        }

        res.status(500).json({message: error.message})
    }
});

router.get('/:id', async (req, res) => {
    try{
        const result = await Model.findById(req.params.id);

        if (!result) {
            res.status(404).json('Not found');
        }

        res.status(200).json(result);
    }
    catch(error){
        if (error.name === "ValidationError") {
            res.status(400).json({message: error.message})
        }

        res.status(500).json({message: error.message})
    }
});

router.post('/', async (req, res) => {
	try {
    	const data = new Model({
    		email: req.body.email,
    		username: req.body.username,
    		password: req.body.password,
    		created_at: new Date()
    	});

		const result = await data.save();

		res.status(200).json(result);
	}
	catch(error) {
        if (error.name === "ValidationError") {
            res.status(400).json({message: error.message})
        }

		res.status(500).json({message: error.message})
	}
});

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, data, options
        )

        res.status(200).json(result);
    }
    catch (error) {
        if (error.name === "ValidationError") {
            res.status(400).json({message: error.message})
        }

        res.status(500).json({ message: error.message })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Model.findByIdAndDelete(id);

        res.status(200).json(data.id);
    }
    catch (error) {
        if (error.name === "ValidationError") {
            res.status(400).json({message: error.message})
        }

        res.status(500).json({ message: error.message })
    }
});

module.exports = router;