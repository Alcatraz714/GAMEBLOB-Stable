const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose")


app.use(bodyParser.urlencoded({extended:true}))
mongoose.connect('mongodb://localhost:27017/gameblob', {useNewUrlParser: true, useUnifiedTopology: true});

const game = require("./models/games.js"),
      admin = require("./models/admins.js")
      //users = require("./models/users.js")

app.use(express.static(__dirname + '/views'));
//app.use(express.static(__dirname + '/views/assets/css'));


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
    req.body.game.critic = req.body.critic
    const gameToAdd = req.body.game
    //console.log(req.body.critic)
    console.log(gameToAdd)
    game.create(gameToAdd, function(game, err){
        if(err){
            console.log(err)
        }
        else{
            console.log(gameToAdd)
        }
    })
    res.redirect("/admin/addGame")
})

app.post("/admin/addGame2", function(req,res){
    
    const gameToAdd = req.body.game
    //console.log(gameToAdd)
    game.updateOne({name:gameToAdd.name},{$push : {sys_req : gameToAdd.sys_req}},dataProcessedMongo)
    res.redirect("/admin/addGame")
})

app.get("/home", function(req,res){
    let car_game = [], all_game=[]
    game.aggregate([{ $sample: { size: 3 } }], function(err,games){
        if(err){
            console.log(err)
        }else{
            car_game = games
            game.find({}, function(err, games){
                if(err){
                    console.log(err)
                }else{
                    all_game = games
                    res.render("home.ejs", {car_game: car_game, all_game: all_game})
                }
            })
            //res.render(car_game)        
        }
    }) 
})

app.get("/home/:gameid", function(req,res){
    game.findOne({_id : req.params.gameid},function(err,games){
        if(err){
            console.log(err)
        }else{
            res.render("game.ejs",{games : games})
            //console.log(games)
        }
    })
    
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