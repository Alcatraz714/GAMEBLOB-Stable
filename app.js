const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose"),
      morgan = require("morgan"),
      CatchAsync = require("./views/assets/js/CatchAsync.js"),
      ExpressError = require("./views/assets/js/ExpressError.js"),
      session = require("express-session"),
      passport = require("passport"),
      LocalStratergy = require("passport-local")
    
const adminRoute = require('./routes/admin.js'),
      homeRoute = require("./routes/home.js"),
      userRoute = require("./routes/user.js")

const sessionConfig = {
    secret : "gameblobisawesome",
    resave : false,
    saveUninitialized : true,
    cookie : {
        httpOnly : true,
        expire : Date.now() +  8.64e+7 * 7,
        maxAge : 8.64e+7 * 7
    }
}

app.use(session(sessionConfig))
app.use(bodyParser.urlencoded({extended:true}))
app.use(morgan('tiny'))
app.use(passport.initialize())
app.use(passport.session())

mongoose.connect('mongodb://localhost:27017/gameblob', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex : true});

const game = require("./models/games.js"),
      user = require("./models/users.js")

passport.use(new LocalStratergy(user.authenticate()))
passport.serializeUser(user.serializeUser())
passport.deserializeUser(user.deserializeUser())

app.use(express.static(__dirname + '/views'));
//app.use(express.static(__dirname + '/views/assets/css'));

app.use("/admin", adminRoute);
app.use("/home", homeRoute);
app.use("/", userRoute)

app.get("/", (req,res) => {
    res.render("index.ejs")
}) 

app.get("/login", (req,res) => {
    res.render("login.ejs")
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


app.get("*", (req,res) => {
    res.render("error.ejs", {statusCode: 404, message: "Page Not Found"})
})

app.use((err, req, res, next) => {
    let { statusCode=500 , message} = err
    //console.log(err)
    if(err.name==="CastError") statusCode=404,message="Page Not Found"
    if(err.name==="TypeError") statusCode=500,message="Something Went Wrong Internally"
    return res.render("error.ejs", {statusCode: statusCode, message: message})
})

app.listen(3000, () => {
    console.log("GameBlob servers have started on http://localhost:3000 !!")
})