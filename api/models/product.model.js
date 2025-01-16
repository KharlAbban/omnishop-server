const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        category: {
            type: String,
            required: true
        },
        pricePerPound: {
            type: Number,
            required: true
        },
        inStock: {
            type: Boolean,
            required: true
        },
        poundsLeft: {
            type: Number,
            required: true
        },
        images: {
            type: [String],
            required: true
        },
        storageInstructions: {
            type: String,
            required: true
        },
        origin: {
            type: String,
            required: true
        },
        expiryDate: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
    }
);
  
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
  