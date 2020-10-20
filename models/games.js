const mongoose = require("mongoose")

const gameDisplaySchema = new mongoose.Schema({
    name : String,
    desc : String,
    price : Number,
    img: {
        high_res:[{
            type: String
        }],
        title_img : String,
        logo : String
    },
    critic: {
        name : String,
        review: String
    },
    sys_req : String,
    rating : Number,
    dev : String,
    publisher : String,
    release : Date
})

module.exports = mongoose.model("game", gameDisplaySchema); 