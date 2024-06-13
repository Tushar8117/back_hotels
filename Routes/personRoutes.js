const express = require('express');
const router = express.Router();

const Person = require('./../models/person');

router.post('/', async (req, res) => {
    try {
        const data = req.body; // Assuming the request body containes the person data

        //Create a new person document using mongoose model
        const newPerson = new Person(data);

        //save the new person data in database

        const savedPerson = await newPerson.save();
        console.log("Data Saved");
        res.status(200).json(savedPerson);


    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });

    }
});

router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log("Data Fetched!");
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if (workType == 'chef' || workType == 'waiter' || workType == 'manager') {
            const response = await Person.find({ work: workType });

            console.log('Responce fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid work type' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const personID = req.params.id; // Extract the id from url parameter
        const updatedPersondata = req.body; // Updated data for thr person

        const response = await Person.findByIdAndUpdate(personID, updatedPersondata, {
            new: true, // Return the updated document
            runValidators: true, // Run moongose validation
        })
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log("data updated succesfully");
        res.status(200).json(response);


    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const PersonId = req.params.id;

        // Delete method
        const response = await Person.findByIdAndDelete(PersonId);
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log("data delete succesfully");
        res.status(200).json({ message: 'Data Delete Succesfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})
// Comment added for testing
module.exports = router;