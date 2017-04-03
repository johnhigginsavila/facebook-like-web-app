var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var db = require('./server/database/database');
var jwt = require('jsonwebtoken');


process.env.SECRET = "MY SUPER SECRET KEY";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/client',express.static(__dirname + '/client'));


//CONTROLLER


//ROUTERS


//ROUTES
app.get('/', function(req, res){
    res.sendFile(__dirname+'/client/index.html');
})

app.listen(5000, function(){
    console.log("Listening on port: "+5000);
})