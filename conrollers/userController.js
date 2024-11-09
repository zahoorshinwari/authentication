const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if the user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "User already exists" });
        }
        
        // Create a new user instance and hash the password
        const userInfo = new User({ email, name, password: await bcrypt.hash(password, 10) });
        
        // Save the new user
        await userInfo.save();
        
        return res.status(201).json({ message: "Registration successful" });
    } catch (err) {
        console.error("Error in registration:", err); // Log the error for debugging
        res.status(500).json({ message: "Internal server error" });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: "Auth failed: username/password incorrect" });
        }

        // Check if the password is correct
        const isPassMatch = await bcrypt.compare(password, user.password);
        if (!isPassMatch) {
            return res.status(403).json({ message: "Auth failed: username/password incorrect" });
        }
        
        // Create a user object for the token payload
        const userObject = { email, name: user.name, _id: user._id };
        
        // Generate a JWT token
        const jwtToken = jwt.sign(userObject, "webjsonwebtoken", { expiresIn: '4h' });

        userObject.jwtToken = jwtToken;
        
        res.status(200).json({ message: "Login successful", data: userObject });
    } catch (err) {
        console.error("Error in login:", err); // Log the error for debugging
        res.status(500).json({ message: "Internal server error" });
    }
}

const getUser = async (req, res) => {
    try {
        const results = await User.find({});
        res.status(200)
            .json({message: "success", data: results })
    } catch (err) {
        res.status(500)
            .json({message: "internal server error"})
    }
}


const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await User.findById(id);
        res.status(200)
            .json({ message: "success", data: result });
    } catch (err) {
        res.status(500)
            .json({ message: "Internal server error" });
    }
}


const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const updateDoc = { $set: { ...body } };
        updateDoc.updatedAt = Date.now();
        await User.findByIdAndUpdate(id, updateDoc);
        res.status(200)
            .json({ message: "updated" });
    } catch (err) {
        res.status(500)
            .json({ message: "Internal server error" });
    }
}

const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        await User.findByIdAndDelete(id);
        res.status(200)
            .json({ message: "deleted" });
    } catch (err) {
        res.status(500)
            .json({ message: "Internal server error" });
    }
}


module.exports = {
    registerUser,
    loginUser, 
    getUser, 
    getUserById,
    updateUserById,
    deleteUserById

}
