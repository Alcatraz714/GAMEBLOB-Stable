var express = require("express")
var app = express()
var pfname = "mg"


app.use(express.static(__dirname + '/views'));

app.get("/", function(req,res){
    res.render("index.ejs", {pfname : pfname})
}) 

app.get("/login", function(req,res){
    res.render("login.ejs")
})

app.get("/home", function(req,res){
    res.send("This will be the home page")
})

app.get("/profile/:user", function(req,res){
    res.send("This will be page for the user") 
})

app.post("/addFeedback", function(req,res){
    res.redirect("/")
})

app.get("/search", function(req,res){
    res.send("This will be the search page") 
})

app.get("*", function(req,res){
    res.send("This page does not exist")
})

app.listen(3000, function(){
    console.log("GameBlob servers have started on http://localhost:3000 !!")
})