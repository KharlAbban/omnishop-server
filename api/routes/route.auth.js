const express = require("express");
const authRouter = express.Router();
const Product = require("../models/product.model");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

authRouter.post("/login", async (req, res) => {
    try {
        const creds = req.body;
        const {email, password} = creds;

        const existingUser = await User.findOne({email: email});
        
        if (!existingUser) {
            return res.status(401).json({message: "Invalid credentials"});
        }

        if (await bcrypt.compare(password, existingUser.password)) {
            return res.status(200).json({
                id: existingUser._id,
                email: existingUser.email,
            });
        } else {
            return res.status(401).json({message: "Invalid credentials"});
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            error: error.message
        })
    }
});

authRouter.get("/register", async (req, res) => {
    try {
        const creds = JSON.parse(req.body);
        const existingUser = User.findOne({email: creds.email});
        
        if (existingUser) {
            return res.status(409).json({message: "Email already exists"});
        } else {
            const item = await Product.find({_id: productId});
            res.status(200).json(item[0])
        }
        
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
});

module.exports = authRouter;