const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose")


app.use(bodyParser.urlencoded({extended:true}))
mongoose.connect('mongodb://localhost:27017/gameblob', {useNewUrlParser: true, useUnifiedTopology: true});

const game = require("./models/games.js"),
      admin = require("./models/admins.js")
      //users = require("./models/users.js")


function dataProcessedMongo(err, data){
    if(err){
        console.log(err)
    }else{
        console.log(data)
    }
}

app.use(express.static(__dirname + '/views'));

app.get("/", function(req,res){
    res.render("index.ejs")
}) 

app.get("/login", function(req,res){
    res.render("login.ejs")
})

app.get("/admin", function(req,res){
    res.render("admin.ejs")
})

app.post("/admin", function(req,res){
    const user1 = req.body.admin.user;
    const pass = req.body.admin.pass;
    admin.findOne({user : user1},function(err, user){
        const real_pass = user.password
        console.log(real_pass)
        if(pass===real_pass){
            res.redirect("/admin/addGame")
        }else{
            res.redirect("/admin")
        }
    })
})

app.get("/admin/addGame", function(req,res){
    res.render("addGame.ejs")
})

app.post("/admin/addGame", function(req,res){
    
    req.body.game.img = req.body.img
    const gameToAdd = req.body.game
    //console.log(gameToAdd)
    game.create(gameToAdd, dataProcessedMongo)
    res.redirect("/admin/addGame")
})

app.post("/admin/addGame2", function(req,res){
    
    const gameToAdd = req.body.game
    //console.log(gameToAdd)
    game.updateOne({name:gameToAdd.name},{$push : {sys_req : gameToAdd.sys_req}},dataProcessedMongo)
    res.redirect("/admin/addGame")
})

app.get("/home", function(req,res){
    const car_game = [
        {img : "https://www.godisageek.com/wp-content/uploads/Doom-Eternal-Key-Art.jpg", desc : "Doom Eternal is a first-person shooter video game developed by id Software and published by Bethesda Softworks."},
        {img : "https://cdn.mos.cms.futurecdn.net/GSYDS6PSPWPzWm3fFGj5gj-1200-80.jpg", desc: "No Man's Sky is an exploration real-time strategy survival game developed and published by the indie studio Hello Games." },
        {img : "https://i.ytimg.com/vi/jEp9yyhwZFE/maxresdefault.jpg", desc : "Journey across a magical realm of diverse cultures and kingdoms in the epic title of Genshin Impact."}
    ]
    const all_game = [
        {img : "https://ubistatic19-a.akamaihd.net/ubicomstatic/en-ca/global/game-info/acb_nakedbox_mobile_161339.jpg", title : "Assassins Creed Director's Cut", desc : "Assassin's Creed is an action-adventure video game developed by Ubisoft Montreal and published by Ubisoft."},
        {img : "https://ubistatic19-a.akamaihd.net/ubicomstatic/en-us/global/game-info/acrogue_remastered-gameinfo-boxshot_art-ubinew-02-348x434_316967.jpg", title : "Assassin's Creed Rouge", desc : "Assassin's Creed Rogue an adventurous Assassin to a grim Templar willing to hunt down his former brothers."}
    ]
    res.render("home.ejs", {car_game: car_game, all_game: all_game})
})

app.get("/profile/:user", function(req,res){
    res.send("This will be page for the user") 
})

app.post("/addFeedback", function(req,res){
    res.redirect("/")
})

app.get("/home/search", function(req,res){
    res.send("This will be the search page") 
})

app.get("*", function(req,res){
    res.send("This page does not exist")
})

app.listen(3000, function(){
    console.log("GameBlob servers have started on http://localhost:3000 !!")
})