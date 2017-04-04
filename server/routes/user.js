var express = require('express');
var router = express.Router();
var db = require('../database/database');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(5);


//POST ENDPOINTS
//LOGIN
router.post('/login',function(req,res,next){
    var submittedPassword = req.body.password;
    var query = "SELECT * FROM users WHERE username = '"+ req.body.loginName +"' OR email = '"+ req.body.loginName + "'";
    db.query(query).spread(function(result, metadata){
        if(result.length > 0){
            var userData = result[0];
            var isVerified = bcrypt.compareSync(submittedPassword, userData.password);
            var token = jwt.sign(userData, process.env.SECRET, {
                expiresIn : 60*60*24
            })
            if(isVerified){
                delete userData.password;
                console.log(userData);
                res.json({
                    userData : userData,
                    token : token
                })
            }else{
                res.status(400).send('User Entered the wrong password');
            }
        }else{
            res.status(400).send(req.body.loginName +" is not registered.");
        }
    }).catch(function(err){
        res.status(500).send("Unable to process the query, ERROR 1: "+err);
    })
})

//CREATE NEW USER
router.post('/create_new_user', function(req, res, next){
    var password = bcrypt.hashSync(req.body.password, salt);
    var birthday = req.body.birthdayYear +"-"+req.body.birthdayMonth+"-"+req.body.birthdayDay;
    var query = "INSERT INTO users (username, email, password, lastname, firstname, gender, birthday, date_registered) VALUES ('"+req.body.email+"', '"+req.body.email+"', ', "+password+"', '"+req.body.lastname+"', '"+req.body.firstname+"', '"+gender+"', '"+birthday+"', now())";
    db.query(query).spread(function(result, metadata){
        res.status(200).send('User was successfully created.');
    }).catch(function(err){
        res.status(500).send('User was not registered at this time, ERROR 1 on "/create_new_user": '+err);
    })
})

//EXPORTING ROUTER
module.exports = router;