const express = require("express");
const productsRouter = express.Router();
const Product = require("../models/product.model");

productsRouter.get("/", async (req, res) => {
    try {
        const items = await Product.find({});
        res.status(200).json(items)
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
});

productsRouter.get("/:productId", async (req, res) => {
    try {
        const {productId} = req.params;
        const item = await Product.find({_id: productId});
        res.status(200).json(item[0])
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
});

productsRouter.get("/search/:searchTerm", async (req, res) => {
    try {
        const {searchTerm} = req.params;

        if (!searchTerm) {
            return res.status(400).json({message: "Search term is required"});
        }

        const items = await Product.find({
            $or: [
              { name: { $regex: searchTerm, $options: "i" } },
              { category: { $regex: searchTerm, $options: "i" } }
            ]
        });
        
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
});


module.exports = productsRouter;