const express = require('express')
const router = express.Router()
const CatchAsync = require("../views/assets/js/CatchAsync.js"),
      ExpressError = require("../views/assets/js/ExpressError.js")
const { gameSchema } = require("../models/validate.js"),
        admin = require("../models/admins.js");

const validateSchema = (req, res, next) => {
    const result = gameSchema.validate(req.body,{stripUnknown: { objects: true } })
    if(result.error){
        let msg = JSON.stringify(result.error.details[0])
        //console.log(msg)
        return next(new ExpressError(msg, 400))
    }
    next()
}   

router.get("/", (req,res) => {
    res.render("admin.ejs")
})

router.post("/", CatchAsync(async (req,res) => {
    const user1 = req.body.admin.user;
    const pass = req.body.admin.pass;
    const pass_real = await admin.findOne({user : user1}).password
    if(pass==="abc"){
        res.redirect("/admin/addGame")
    }else{
        res.redirect("/")
    }
}))

router.get("/addGame", (req,res) => {
    res.render("addGame.ejs")
})

router.post("/addGame",validateSchema,  CatchAsync(async (req,res,next) => {
    req.body.game.img = req.body.img
    req.body.game.critic = req.body.critic
    const gameToAdd = req.body.game
    //console.log(req.body.critic)
    //console.log(gameToAdd)
    await game.create(gameToAdd, (game, err) => {
        res.redirect("/admin/addGame")
    })
    
}))

module.exports = router