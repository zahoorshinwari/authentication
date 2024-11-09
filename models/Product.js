const mongoose = require('mongoose');
const Schema = mongoose.Schema;  // Corrected typo here

const ProductModel = new Schema(
    {
        productName: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        price: {
            type: Number,
            required: true
        },
        availableStock: {
            type: Number,
            required: true
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

module.exports = mongoose.model('Product', ProductModel);  // Changed 'products' to 'Product' for consistency
