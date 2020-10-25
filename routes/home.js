const express = require('express')
const router = express.Router()
const CatchAsync = require("../views/assets/js/CatchAsync.js"),
      ExpressError = require("../views/assets/js/ExpressError.js")
const game = require("../models/games.js")


router.get("/", CatchAsync(async (req,res) => {
    let car_game = [], all_game=[]
    car_game =await game.aggregate([{ $sample: { size: 3 } }]) 
    all_game = await game.find({})
    res.render("home.ejs", {car_game: car_game, all_game: all_game})
}))

router.get("/search", CatchAsync(async (req,res, next) => {
    const q = req.query.q
    const query = new RegExp(q,"i")
    const games = await game.find({name : {$in : query}})
    //console.log(games)
    res.render("list.ejs", {query : q, games: games})
}))

router.get("/about", (req, res) => {
    res.render("about.ejs")
})

module.exports = router