const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        items: [
            {
                product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
                quantity: { type: Number, required: true },
            },
        ],
        totalAmount: { type: Number, required: true },
        status: {
            type: String,
            enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
            default: 'Pending',
        },
        paymentMethod: { type: String },
    },
    {
        timestamps: true
    }
);
  
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;