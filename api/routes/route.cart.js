const express = require("express");
const cartRouter = express.Router();
const Cart = require("../models/cart.model");

cartRouter.get("/getItems/:userEmail", async (req, res) => {
    try {
        const { userEmail } = req.params;

        if (!userEmail) return res.status(401).json({message: "Invalid user!"});

        // Find the cart for the user
        const userCart = await Cart.findOne({ userEmail });

        // If no cart is found, return an empty array
        if (!userCart) {
            return res.status(200).json([]);
        }

        // Return only the items property
        return res.status(200).json(userCart.items);
    } catch (error) {
        console.error("Error fetching cart items:", error);
        return res.status(500).json({ message: "An error occurred while fetching cart items" });
    }
});

cartRouter.post("/saveItems/:userEmail", async (req, res) => {
    try {
        const {userEmail} = req.params;
        const items = req.body;

        if (!Array.isArray(items) || !userEmail) {
            return res.status(400).json({message: "Invalid items array!"});
        }

        // Find the cart for the user
        const userCart = await Cart.findOneAndUpdate(
            {userEmail},
            { $set: { items } },
            {upsert: true, new: true}
        );
            
        return res.status(200).json(userCart.items);
    
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
});

module.exports = cartRouter;