const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const UserModel = new Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a username"]
        },
        profession: {
            type: String,
            required: [true, "Please provide a profession"]
        },
        phoneNumber: {
            type: String,
            required: [true, "Please provide a phone number"],
            validate: {
                validator: function(value) {
                    return validator.isMobilePhone(value, 'any');
                },
                message: "Not a valid phone number"
            }
        },
        email: {
            type: String,
            required: true,
            validate: {
                validator: function(value) {
                    return validator.isEmail(value);
                },
                message: "Not a valid email"
            }
        },
        address: {
            type: String,
            required: [true, "Please provide an address"]
        },
        city: {
            type: String,
            required: [true, "Please provide a city"]
        },
        password: {
            type: String,
            required: [true, "Please provide a password"]
        },
        isApproved: {
            type: Boolean,
            default: false
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
        timestamps: true
    }
);

module.exports = mongoose.model('User', UserModel);
