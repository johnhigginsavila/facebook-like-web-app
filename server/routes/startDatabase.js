var db = require('../database/database');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

//Initialize database
router.get('/initialize_db',function(req,res,next){
    var query = "CREATE TABLE users (id SERIAL, username VARCHAR NOT NULL UNIQUE, email VARCHAR NOT NULL UNIQUE, lastname VARCHAR NOT NULL, password VARCHAR NOT NULL, firstname VARCHAR NOT NULL, gender VARCHAR NOT NULL, birthday DATE NOT NULL, date_registered DATE, PRIMARY KEY (id))";
    db.query(query).spread(function(result, metadata){
        res.status(200).send('Query successful');
        next();
    }).catch(function(err){
        res.status(500).send('Query unsuccessful, ERROR: '+err);
        next();
    }).then(function(){
        res.end;
    })
})



module.exports = router;