const mongoose = require('mongoose');

const userModel = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: [true, "please enter your mobile number"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model("User", userModel);