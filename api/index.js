if (process.env.NODE_ENV !== 'production') require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const productsRouter = require("./routes/route.products");
const authRouter = require("./routes/route.auth");
const cartRouter = require("./routes/route.cart");

const app = express();
const PORT = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_CONNECTION_STRING;

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.use("/api/products", productsRouter);
app.use("/api/auth", authRouter);
app.use("/api/cart", cartRouter);


// Database connection
mongoose.connect(mongoUri)
    .then(() => {
        console.log("Connected to MongoDB!");
        app.listen(PORT, (req, res) => {
            console.log(`Server running on port ${PORT}`)
        });
    })
   .catch((err) => console.error("Could not connect to MongoDB", err));

app.get("/", async (req, res) => {
    try {
        return res.json({
            message: "Hello world!",
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            error: error.message
        })
    }
});