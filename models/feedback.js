const mongoose = require('mongoose')

const feedbackSchema = mongoose.Schema({
    name : String,
    phone : String,
    email : String,
    message : String
})

module.exports = mongoose.model('feedback', feedbackSchema)