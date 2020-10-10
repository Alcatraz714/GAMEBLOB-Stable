const mongoose = require("mongoose")

const adminLoginSchema = new mongoose.Schema({
    user : String,
    password : String
})

module.exports = mongoose.model("admin", adminLoginSchema); 