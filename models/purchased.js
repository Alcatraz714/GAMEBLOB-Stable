const mongoose = require('mongoose')

const purchaseSchema = new mongoose.Schema({
    userid : { 
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    gameid : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'game'
    }
})

module.exports = mongoose.model('purchase', purchaseSchema)