const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanyModel = new Schema(
    {
        companyName: {
            type: String,
            required: true
        },
        businessNature: {
            type: String,
            required: true
        },
        companyAddress: {
            type: String,
            required: true
        },
        companyCity: {
            type: String,
            required: true
        },
        companyPhoneNo: {
            type: String,
            required: true
        },
        totalAmount: {
            type: Number,
            required: true
        },
        companyWebsite: {
            type: String,
            required: false
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    }
);

module.exports = mongoose.model('Company', CompanyModel);
