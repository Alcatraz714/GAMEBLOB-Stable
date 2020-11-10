const { localsName } = require("ejs")

const express = require("express"),
      app = express(),
      flash = require("connect-flash")

const isLoggedIn = (req, res, next) => {
    //console.log(res.locals.loggedInUser)
    if(!req.isAuthenticated()){
        console.log(req.originalUrl)
        req.flash('error', 'You must be logged in to access this feature!')
        return res.redirect("/login")
    }
    next();
}

module.exports = isLoggedIn