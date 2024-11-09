const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const AdminModel = new Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide name"]
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw Error('Not a valid Email');
                }
            }
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: 'admin',
            enum: ['admin', 'superadmin']
        },
        permissions: {
            type: Array,
            default: [] // You can specify default permissions here, if any.
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        timestamps: true // Automatically adds createdAt and updatedAt fields
    }
);

module.exports = mongoose.model('admins', AdminModel);
