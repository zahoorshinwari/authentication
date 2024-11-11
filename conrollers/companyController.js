const Company = require('../models/Company');

const createCompany = async (req, res) => {
    const body = req.body;
    console.log('Company Info ', req.body);
    try {
        const company = new Company(body);
        const result = await company.save();
        res.status(201)
            .json({ message: "Company created", result });
    } catch (err) {
        res.status(500)
            .json({ message: "Internal server error" });
    }
}

const getCompanies = async (req, res) => {
    try {
        const results = await Company.find({});
        res.status(200)
            .json({ message: "success", data: results });
    } catch (err) {
        res.status(500)
            .json({ message: "Internal server error" });
    }
}

const getCompanyById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Company.findById(id);
        res.status(200)
            .json({ message: "success", data: result });
    } catch (err) {
        res.status(500)
            .json({ message: "Internal server error" });
    }
}

const updateCompanyById = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const updateDoc = { $set: { ...body } };
        updateDoc.updatedAt = Date.now();
        await Company.findByIdAndUpdate(id, updateDoc);
        res.status(200)
            .json({ message: "Company updated" });
    } catch (err) {
        res.status(500)
            .json({ message: "Internal server error" });
    }
}

const deleteCompanyById = async (req, res) => {
    try {
        const id = req.params.id;
        await Company.findByIdAndDelete(id);
        res.status(200)
            .json({ message: "Company deleted" });
    } catch (err) {
        res.status(500)
            .json({ message: "Internal server error" });
    }
}

module.exports = {
    createCompany,
    getCompanies,
    getCompanyById,
    updateCompanyById,
    deleteCompanyById
}
