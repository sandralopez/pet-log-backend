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

        res.json(user.pets);
    }
    catch(error){
        if (error.name === "ValidationError") {
            res.status(400).json({message: error.message})
        }

        res.status(500).json({message: error.message})
    }
});

router.get('/:petId', async (req, res) => {
	try {
		const { userId, petId } = req.params;
	
	    const user = await Model.findById(userId);

	    if (!user) {
	      return res.status(404).json({ error: 'Not found' });
	    }

	    const pet = user.pets.id(petId);

	    if (!pet) {
	    	return res.status(404).json({ error: 'Not found' });
	    }

	    res.status(200).json(pet);
	}
	catch (error) {
        if (error.name === "ValidationError") {
            res.status(400).json({message: error.message})
        }

		res.status(500).json({ message: error.message });
	}
});

router.post('/', async (req, res) => {
	try {
		const { userId } = req.params;

		const pet = {
			name: req.body.name,
			species: req.body.species,
			birthdate: req.body.birthdate,
			image: req.body.image,
			created_at: new Date()
		};

	    const user = await Model.findById(userId);

	    if (!user) {
	      return res.status(404).json({ error: 'Not found' });
	    }

	    user.pets.push(pet);

	    await user.save();

	    res.status(201).json(user.pets);
	}
	catch (error) {
        if (error.name === "ValidationError") {
            res.status(400).json({message: error.message})
        }

		res.status(500).json({ message: error.message });
	}
});

router.patch('/:petId', async (req, res) => {
	try {
		const { userId, petId } = req.params;

	    const user = await Model.findById(userId);

	    if (!user) {
	      return res.status(404).json({ error: 'Not found' });
	    }

	    const pet = user.pets.id(petId);

	    if (!pet) {
	    	return res.status(404).json({ error: 'Not found' });
	    }

	    pet.set(req.body);
	    user.save();

	    res.status(200).json(pet);
	}
	catch (error) {
        if (error.name === "ValidationError") {
            res.status(400).json({message: error.message})
        }

		res.status(500).json({ message: error.message });
	}
});

router.delete('/:petId', async (req, res) => {
    try{
    	const { userId, petId } = req.params;

    	const user = await Model.findById(userId);

	    if (!user) {
	      return res.status(404).json({ error: 'Not found' });
	    }

	    const pet = user.pets.id(petId);

	    if(!pet) {
	    	return res.status(404).json({ error: 'Not found' });
	    }

	    user.pets.pull(petId);
	    await user.save();

	    res.status(200).json(pet);
    }
    catch(error){
        if (error.name === "ValidationError") {
            res.status(400).json({message: error.message})
        }

        res.status(500).json({message: error.message})
    }
});

module.exports = router;