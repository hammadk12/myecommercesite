const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

// Helper function to generate JWT
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '60m' });
};

// Register User
exports.registerUser = async (req, res) => {
    console.log(req.body)
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email is already in use' });
        }

        const user = new User({ username, email, password });
        await user.save();

        const token = generateToken(user._id);
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// User Login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user._id);
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // Set cookie for 1 hour
        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get User Profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userData.id).select('-password'); // Changed from req.userId to req.userData.id
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update User Profile
exports.updateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const updates = {};

        // Check if the email is being updated and if it's already in use
        if (email) {
            const existingUser = await User.findOne({ email });
            if (existingUser && existingUser._id.toString() !== req.userData.id) {
                return res.status(400).json({ message: 'Email is already in use' });
            }
            updates.email = email;
        }

        if (name) updates.name = name;
        
        if (password) {
            if (password.length < 6) {
                return res.status(400).json({ message: 'Password should be at least 6 characters long' });
            }
            updates.password = await bcrypt.hash(password, 12);
        }

        const user = await User.findByIdAndUpdate(req.userData.id, updates, { new: true }).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Logout user
exports.logoutUser = (req, res) => {
    res.cookie('token', '', { httpOnly: true, maxAge: 0});
    res.json({ message: 'Logged out successfully' });
};

// Delete user/account
exports.deleteUser = async (req, res) => {
    try {
        // Verify user deleting account is account owner
        const userId = req.userData.id; 
        const requestedDeleteUserId = req.params.userId;

        if (userId !== requestedDeleteUserId) {
            return res.status(403).json({ message: 'Unauthorized to delete this account' });
        }

        // Deletion
        await User.findByIdAndDelete(userId);
        res.json({ message: 'Account successfully deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
