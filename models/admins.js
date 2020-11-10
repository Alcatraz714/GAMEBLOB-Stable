const mongoose = require("mongoose")
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')

const adminLoginSchema = new mongoose.Schema({})

adminLoginSchema.plugin(passportLocalMongoose)
module.exports = mongoose.model("admin", adminLoginSchema); 