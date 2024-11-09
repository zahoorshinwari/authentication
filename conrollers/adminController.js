const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const registerAdmin = async (req, res) => {
    try {
        const { name, email, password, role = 'admin', permissions = [] } = req.body;
        
        // Check if any admin already exists
        const existingAdmin = await Admin.findOne({ role: 'admin' });
        if (existingAdmin) {
            return res.status(409).json({ message: "Only one admin account is allowed." });
        }
        
        // Check if the email is already in use by an admin
        const admin = await Admin.findOne({ email });
        if (admin) {
            return res.status(409).json({ message: "Admin with this email already exists." });
        }
        
        // Create a new admin instance and hash the password
        const adminInfo = new Admin({
            name,
            email,
            role,
            permissions,
            password: await bcrypt.hash(password, 10)
        });
        
        // Save the new admin
        await adminInfo.save();
        
        return res.status(201).json({ message: "Admin registration successful" });
    } catch (err) {
        console.error("Error in admin registration:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find the admin by email
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(403).json({ message: "Auth failed: email/password incorrect" });
        }

        // Check if the password is correct
        const isPassMatch = await bcrypt.compare(password, admin.password);
        if (!isPassMatch) {
            return res.status(403).json({ message: "Auth failed: email/password incorrect" });
        }
        
        // Create a token payload with admin details
        const adminObject = { email, name: admin.name, role: admin.role, _id: admin._id };
        
        // Generate a JWT token
        const jwtToken = jwt.sign(adminObject, "adminjsonwebtoken", { expiresIn: '4h' });

        adminObject.jwtToken = jwtToken;
        
        res.status(200).json({ message: "Admin login successful", data: adminObject });
    } catch (err) {
        console.error("Error in admin login:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}

const getAdmins = async (req, res) => {
    try {
        const results = await Admin.find({});
        res.status(200).json({ message: "success", data: results });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
}

const getAdminById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Admin.findById(id);
        if (!result) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json({ message: "success", data: result });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
}

const updateAdminById = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const updateDoc = { $set: { ...body, updatedAt: Date.now() } };
        
        const updatedAdmin = await Admin.findByIdAndUpdate(id, updateDoc, { new: true });
        if (!updatedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        
        res.status(200).json({ message: "Admin updated", data: updatedAdmin });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteAdminById = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedAdmin = await Admin.findByIdAndDelete(id);
        
        if (!deletedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        
        res.status(200).json({ message: "Admin deleted" });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    registerAdmin,
    loginAdmin,
    getAdmins,
    getAdminById,
    updateAdminById,
    deleteAdminById
};
