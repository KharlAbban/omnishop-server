if (process.env.NODE_ENV !== 'production') require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const productsRouter = require("./routes/route.products");

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

app.listen(PORT, (req, res) => {
    console.log(`Server running on port ${PORT}`)
});

// Database connection
mongoose.connect(mongoUri).then(() => console.log("Connected to MongoDB"))
   .catch((err) => console.error("Could not connect to MongoDB", err));

app.get("/", async (req, res) => {
    res.json({
        message: "Hello world!",
    })
});

module.exports = app;