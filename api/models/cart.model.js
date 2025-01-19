const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        userEmail: {
            type: String,
            required: true,
            index: true,
            unique: true
        },
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                name: {
                    type: String,
                    required: true
                },
                price: {
                    type: Number,
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                    default: 1
                },
                image: {
                    type: String,
                    required: true
                },
            },
        ],
    },
    {
        timestamps: true
    }
);
  
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;