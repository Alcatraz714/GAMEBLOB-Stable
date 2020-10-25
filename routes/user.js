const express = require('express')
const router = express.Router()
const passport = require('passport')
const CatchAsync = require("../views/assets/js/CatchAsync.js"),
      ExpressError = require("../views/assets/js/ExpressError.js")
const user = require("../models/users.js")

router.get("/login", (req, res) => {
    res.render("login.ejs")
})

router.post("/register", CatchAsync(async(req, res) => {
    const regUser = new user(req.body.user)
    const pass = req.body.password
    const newUser = await user.register(regUser, pass)
    res.redirect("/home")
}))

router.post("/login",passport.authenticate('local',{failureRedirect : "/"}), (req,res) => {
    alert("success")
    res.redirect("/home")
})

module.exports = router