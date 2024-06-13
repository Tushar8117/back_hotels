const express = require('express');
const router = express.Router();

const menu = require('./../models/menu');

router.post('/', async (req, res) => {
    try {
        const data = req.body;

        const newMenu = new menu(data);

        const savedMenu = await newMenu.save();
        console.log("Data Saved");
        res.status(200).json(savedMenu);


    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const data = await menu.find();
        console.log("Data Fetched Successfully");
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.get('/:tastetype', async (req, res) => {
    try {
        const tastetype = req.params.tastetype;
        if (tastetype == 'sweet' || tastetype == 'sour' || tastetype == 'spicy') {
            const response = await menu.find({ taste: tastetype });
            console.log("Responce Fetched");
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid menu type' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.put('/:id', async (req, res) => {
    try {
        const menuID = req.params.id;
        const updatedMenudata = req.body;
        const response = await menu.findByIdAndUpdate(menuID, updatedMenudata, {
            new: true,
            runValidators: true
        });
        if (!response) {
            res.status(404).json({ error: 'Menu not found' });
        }
        console.log("Menu updated successfully");
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }

})

router.delete('/:id', async (req, res) => {
    try {
        const menuID = req.params.id;
        const response = await menu.findByIdAndDelete(menuID);
        if (!response) {
            res.status(404).json({ error: 'Menu not found' });
        }
        console.log("data delete successufully");
        res.status(200).json({ message: 'Deleted menu Successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router;