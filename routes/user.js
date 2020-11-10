const express = require('express')
const router = express.Router()
const passport = require('passport')
const CatchAsync = require("../views/assets/js/CatchAsync.js"),
      ExpressError = require("../views/assets/js/ExpressError.js")
const user = require("../models/users.js")
const flash = require("connect-flash")
const session = require("express-session")
router.use(flash())
router.get("/login", (req, res) => {
    res.render("login.ejs")
})

router.post("/register", CatchAsync(async(req, res) => {
    const regUser = new user(req.body.user)
    const pass = req.body.password
    const newUser = await user.register(regUser, pass)
    res.redirect("/login")
}))

router.post("/login",passport.authenticate('local',{failureRedirect : "/login", failureFlash: "Username or Password Incorrect"}), (req,res) => {
    let str  = "Welcome back, "+req.user.username+"!"
    req.flash('success', str)
    //console.log(req.session.path)
    res.redirect(req.session.return) 
})

router.get("/logout", (req, res)=>{
    req.logout()
    req.flash('success', 'You have been logged out')
    res.redirect(req.session.return)
})

module.exports = router