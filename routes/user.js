const express = require('express')
const router = express.Router()
const CatchAsync = require("../views/assets/js/CatchAsync.js"),
      ExpressError = require("../views/assets/js/ExpressError.js")
const user = require("../models/users.js")

router.get("/login", (req, res) => {
    res.render("login.ejs")
})

router.post("/register", async(req, res) => {
    const regUser = new user(req.body.user)
    const pass = req.body.password
    const newUser = await user.register(regUser, pass)
    res.send(newUser)
})

module.exports = router