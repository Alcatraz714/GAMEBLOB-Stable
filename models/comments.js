const mongoose = require('mongoose')
require('../models/games.js');
require('../models/users.js');
const commentSchema = new mongoose.Schema(
    {
        text : {
            type : String,
            required : true,
            maxlength : 256
        },
        game :{
            type : mongoose.Schema.Types.ObjectId,
            ref : 'game'
        },
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "user"
        }
    }
)

module.exports = mongoose.model('comment', commentSchema) 