const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const passport = require('passport')

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    dob : {
        type : Date,
        required : true,
    },
    role : {
        type : String,
        default : "user"
    },
    ownedGames : [{
        gameid : {
            type: mongoose.Schema.Types.ObjectId,
        }
    }]
})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('user', userSchema)