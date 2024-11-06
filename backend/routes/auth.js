const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password, confirmPassword, name, gender, address, phoneNumber, email } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ 
            username, 
            password: hashedPassword, 
            name, 
            gender, 
            address, 
            phoneNumber, 
            email 
        });
        await newUser.save();
        
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});


router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log("Login attempt for username:", username); // Log username

    try {
        const user = await User.findOne({ username });
        if (!user) {
            console.log("User not found");
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Password mismatch");
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const { password: hashedPassword, ...userWithoutPassword } = user.toObject();

        res.json({ message: 'Login successful', user: userWithoutPassword });
    } catch (err) {
        console.error("Error during login:", err.message);
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = router;