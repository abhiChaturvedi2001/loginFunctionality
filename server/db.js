const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/ecommerce");

const db = mongoose.connection;
db.on("connected", () => {
    console.log("connected success")
})
db.on("disconnected", () => {
    console.log("disconnected success")
})
db.on("error", () => {
    console.log("error")
})

module.exports = db;