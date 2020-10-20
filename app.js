const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose"),
      morgan = require("morgan"),
      CatchAsync = require("./views/assets/js/CatchAsync.js"),
      ExpressError = require("./views/assets/js/ExpressError.js");
    
app.use(bodyParser.urlencoded({extended:true}))
app.use(morgan('dev'))
mongoose.connect('mongodb://localhost:27017/gameblob', {useNewUrlParser: true, useUnifiedTopology: true});

const game = require("./models/games.js"),
      admin = require("./models/admins.js");
      //users = require("./models/users.js")

      

app.use(express.static(__dirname + '/views'));
//app.use(express.static(__dirname + '/views/assets/css'));


app.get("/", (req,res) => {
    res.render("index.ejs")
}) 

app.get("/login", (req,res) => {
    res.render("login.ejs")
})

app.get("/admin", (req,res) => {
    res.render("admin.ejs")
})

app.post("/admin", async (req,res) => {
    const user1 = req.body.admin.user;
    const pass = req.body.admin.pass;
    await admin.findOne({user : user1}, (err, user) => {
        const real_pass = user.password
        console.log(real_pass)
        if(pass===real_pass){
            res.redirect("/admin/addGame")
        }else{
            res.redirect("/admin")
        }
    })
})

app.get("/admin/addGame", (req,res) => {
    res.render("addGame.ejs")
})

app.post("/admin/addGame", CatchAsync(async (req,res,next) => {
    
    req.body.game.img = req.body.img
    req.body.game.critic = req.body.critic
    const gameToAdd = req.body.game
    //console.log(req.body.critic)
    //console.log(gameToAdd)
    await game.create(gameToAdd, (game, err) => {
        res.redirect("/admin/addGame")
    })
    
}))

app.get("/home", async (req,res) => {
    let car_game = [], all_game=[]
    await game.aggregate([{ $sample: { size: 3 } }], function(err,games){
        if(err){
            console.log(err)
        }else{ 
            car_game = games
            //console.log(car_game)
            //res.render(car_game)        
        }
    }) 
    await game.find({}, (err, games) => {
        if(err){
            console.log(err)
        }else{
            all_game = games
            
        }
    })
    res.render("home.ejs", {car_game: car_game, all_game: all_game})
})

app.get("/game/:gameid", CatchAsync(async (req,res,next) => {
        const games = await game.findOne({_id : req.params.gameid})
        const gameid = await games.id
        if(!games){
            return next(new ExpressError("Page not found", 404))
        }
        res.render("game.ejs", {games:games})
    
}))

app.post("/addFeedback", (req,res) => {
    res.redirect("/")
})

app.get("/home/search", CatchAsync(async (req,res, next) => {
    const q = req.query.q
    const query = new RegExp(q,"i")
    const games = await game.find({name : {$in : query}})
    //console.log(games)
    res.render("list.ejs", {query : q, games: games})
}))

/*app.get("/about", (req, res) => {
    res.render("about.ejs")
})*/

app.get("*", (req,res) => {
    res.render("error.ejs", {statusCode: 404, message: "Page Not Found"})
})

app.use((err, req, res, next) => {
    let { statusCode=500 , message} = err
    console.log(err)
    if(err.name==="CastError") statusCode=404,message="Page Not Found"
    if(err.name==="TypeError") statusCode=500,message="Something Went Wrong Internally"
    return res.render("error.ejs", {statusCode: statusCode, message: message})
})

app.listen(3000, () => {
    console.log("GameBlob servers have started on http://localhost:3000 !!")
})