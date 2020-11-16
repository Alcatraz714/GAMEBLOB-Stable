const express = require('express')
const router = express.Router()
const passport = require('passport')
const LocalStratergy = require("passport-local")
const CatchAsync = require("../views/assets/js/CatchAsync.js"),
      ExpressError = require("../views/assets/js/ExpressError.js")
const { gameSchema } = require("../models/validate.js"),
        user = require("../models/users.js"),
        game = require("../models/games.js"),
        feedback = require("../models/feedback.js")
const roles = require("../views/assets/js/roles.js")
const isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.flash('error', 'You must be logged in to access this feature!')
        return res.redirect("/admin")
    }
    //console.log(req.user)
    if(req.user.role != roles.admin){
        req.flash('error', 'You must be an admin access this feature!')
        return res.redirect("/admin")
    }
    next();
}


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

router.post("/",passport.authenticate('local', {failureRedirect : "/admin", failureFlash:"Username or password incorrect"}), CatchAsync(async (req,res) => {
    res.redirect("/admin/home")
}))

router.get("/home",isLoggedIn, (req,res)=>{
    res.render("adminHome.ejs")
})

router.get("/addGame",isLoggedIn, (req,res) => {
    res.render("addGame.ejs")
})

router.get("/feedback", isLoggedIn, async (req,res)=>{
    const feedbacks = await feedback.find({})
    res.render("feedback.ejs", {feedback : feedbacks})
})

router.get("/logout", (req,res) => {
    req.logout()
    res.redirect("/admin")
})

router.post("/addGame",validateSchema,  CatchAsync(async (req,res,next) => {
    req.body.game.img = req.body.img
    req.body.game.critic = req.body.critic
    const gameToAdd = req.body.game
    await game.create(gameToAdd, (game, err) => {
        console.log(game)
        res.redirect("/admin/addGame")
    })
    
}))

module.exports = router