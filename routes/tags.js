const express = require('express');
const Model = require('../models/user');

const router = express.Router({mergeParams: true});

router.get('/', async (req, res) => {
    try{
    	const { userId } = req.params;

    	const user = await Model.findById(userId);

	    if (!user) {
	      return res.status(404).json({ error: 'Not found' });
	    }

        res.json(user.tags);
    }
    catch(error){
        if (error.name === "ValidationError") {
            res.status(400).json({message: error.message})
        }

        res.status(500).json({message: error.message})
    }
});

router.get('/:tagId', async (req, res) => {
    try{
    	const { userId, tagId } = req.params;

    	const user = await Model.findById(userId);

	    if (!user) {
	      return res.status(404).json({ error: 'Not found' });
	    }

	    const tag = user.tags.id(tagId);

	    if(!tag) {
	    	return res.status(404).json({ error: 'Not found' });
	    }

        res.json(tag);
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
		const { userId } = req.params;

		const tag = {
			name: req.body.name,
			datatype: req.body.datatype,
			measureUnit: req.body.measureUnit,
			timeUnit: req.body.timeUnit,
			created_at: new Date()
		};

	    const user = await Model.findById(userId);

	    if (!user) {
	      return res.status(404).json({ error: 'Not found' });
	    }

	    user.tags.push(tag);

	    await user.save();

	    res.status(201).json(user.tags);
	}
	catch (error) {
        if (error.name === "ValidationError") {
            res.status(400).json({message: error.message})
        }

		res.status(500).json({ message: error.message });
	}
});

router.patch('/:tagId', async (req, res) => {
	try {
		const { userId, tagId } = req.params;

	    const user = await Model.findById(userId);

	    if (!user) {
	      return res.status(404).json({ error: 'Not found' });
	    }

	    const tag = user.tags.id(tagId);

	    if (!tag) {
	    	return res.status(404).json({ error: 'Not found' });
	    }

	    tag.set(req.body);
	    user.save();

	    res.status(200).json(tag);
	}
	catch (error) {
        if (error.name === "ValidationError") {
            res.status(400).json({message: error.message})
        }

		res.status(500).json({ message: error.message });
	}
});


router.delete('/:tagId', async (req, res) => {
    try{
    	const { userId, tagId } = req.params;

    	const user = await Model.findById(userId);

	    if (!user) {
	      return res.status(404).json({ error: 'Not found' });
	    }

	    const tag = user.tags.id(tagId);

	    if(!tag) {
	    	return res.status(404).json({ error: 'Not found' });
	    }

	    user.tags.pull(tagId);
	    await user.save();

	    res.json(tag);
    }
    catch(error){
        if (error.name === "ValidationError") {
            res.status(400).json({message: error.message})
        }

        res.status(500).json({message: error.message})
    }
});

module.exports = router;