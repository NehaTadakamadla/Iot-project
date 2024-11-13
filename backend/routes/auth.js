const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
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

// Forgot Password Route (Sends reset token to the user's email)
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'No user found with this email.' });
        }
        console.log('Username', user.email);
        console.log('Senders one":',process.env.App_Name);
        // Generate a reset token and expiration time (1 hour)
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiration = Date.now() + 3600000; // Token valid for 1 hour

        // Save the reset token and expiration time to the user document
        user.resetToken = resetToken;
        user.resetTokenExpiration = resetTokenExpiration;
        await user.save();

        // Send the reset token to the user's email
        const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.App_Name,
                pass: process.env.App_Password,
            },
        });

        const mailOptions = {
            from: process.env.App_Name,
            to: user.email,
            subject: 'Password Reset Request',
            text: `You requested a password reset. Click the link below to reset your password:\n\n${resetUrl}`,
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: 'Password reset link has been sent to your email.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Reset Password Route (Validates token and allows user to set a new password)
router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        // Find user by the reset token and ensure token hasn't expired
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiration: { $gt: Date.now() }, // Token should be valid
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token.' });
        }

        // Hash the new password and update the user's password
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetToken = undefined; // Clear the reset token
        user.resetTokenExpiration = undefined; // Clear the expiration time
        await user.save();

        res.json({ message: 'Password has been successfully reset.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
