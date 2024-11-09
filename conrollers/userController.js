const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, profession, address, city } = req.body;

        if (!name || !email || !password || !phoneNumber || !profession || !address || !city) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phoneNumber,
            profession,
            address,
            city,
            isApproved: false  // Set approval status to false
        });

        await newUser.save();
        res.status(201).json({ message: "Registration successful. Awaiting admin approval." });
    } catch (err) {
        console.error("Error in registration:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Login an existing user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: "Auth failed: username/password incorrect" });
        }

        if (!user.isApproved) {
            return res.status(403).json({ message: "Account not approved by admin." });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(403).json({ message: "Auth failed: username/password incorrect" });
        }

        const userObject = { email, name: user.name, _id: user._id };
        const jwtToken = jwt.sign(userObject, "webjsonwebtoken", { expiresIn: '4h' });

        res.status(200).json({ message: "Login successful", data: { ...userObject, jwtToken } });
    } catch (err) {
        console.error("Error in login:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all users
const getUser = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ message: "success", data: users });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get a user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "success", data: user });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update a user by ID
const updateUserById = async (req, res) => {
    try {
        const { name, profession, phoneNumber, address, city, isApproved } = req.body;

        // Update the user and set updatedAt timestamp
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, profession, phoneNumber, address, city, isApproved, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated", data: updatedUser });
    } catch (err) {
        console.error("Error in updating user:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete a user by ID
const deleteUserById = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted" });
    } catch (err) {
        console.error("Error in deleting user:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUser,
    getUserById,
    updateUserById,
    deleteUserById
};


