const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const saltRounds = 12;

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String, 
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        avatar: {
            type: String
        },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;