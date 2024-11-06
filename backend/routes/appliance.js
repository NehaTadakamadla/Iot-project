const express = require('express');
const Appliance = require('../models/Appliance');
const router = express.Router();

router.post('/add', async (req, res) => {
    const { name, image, type, location, powerConsumption, controlMode } = req.body;
    const userId = req.body.userId;

    try {
        const newAppliance = new Appliance({
            userId,
            name,
            image,
            type,
            location,
            powerConsumption,
            controlMode,
        });
        await newAppliance.save();
        res.status(201).json({ message: 'Appliance added successfully', appliance: newAppliance });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/:id/toggle', async (req, res) => {
    try {
        const appliance = await Appliance.findById(req.params.id);
        if (!appliance) {
            return res.status(404).json({ message: 'Appliance not found' });
        }

        appliance.status = !appliance.status;
        await appliance.save();

        res.json({ message: 'Status updated', appliance });
    } catch (err) {
        console.error("Error updating status:", err);
        res.status(500).json({ message: 'Server error' });
    }
});


router.delete('/:id', async (req, res) => {
    console.log("Delete request received with ID:", req.params.id);
    try {
        const appliance = await Appliance.findById(req.params.id);
        if (!appliance) {
            console.log("Appliance not found");
            return res.status(404).json({ message: 'Appliance not found' });
        }

        await Appliance.deleteOne({ _id: req.params.id });
        console.log("Appliance deleted successfully");
        res.json({ message: 'Appliance deleted successfully' });
    } catch (err) {
        console.error("Error deleting appliance:", err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const appliances = await Appliance.find({ userId });
        res.status(200).json({ appliances });
    } catch (err) {
        console.error("Error fetching appliances:", err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;