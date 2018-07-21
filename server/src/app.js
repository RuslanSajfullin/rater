const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const config  = require('../config/mongo/config');
const mongoose = require('mongoose');
//const MongoStore = require('connect-mongo')(session);
const db = mongoose.connection;
const app = express();
var User = require("../models/user");
var Post = require("../models/post");
var Girl = require("../models/girl");
//TODO вынести апи в отдельную директорию

mongoose.connect(config.db.uri);
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
    console.log("Connection Succeeded");
});

//load passport strategies
//TODO проверить в будущем синтаксис
require('../config/passport/passport.js')(passport);

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

//Functions

var getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

//Methods

app.get('/posts', passport.authenticate('jwt', { session: true}), (req, res) => {
    var token = getToken(req.headers);
    if (token) {
        Post.find({}, 'title description', function (error, posts) {
            if (error) {
                console.error(error);
            }
            res.send({
                posts: posts
            });
        }).sort({_id: -1});
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

app.post('/add_post', passport.authenticate('jwt', { session: true}), (req, res) => {
    var token = getToken(req.headers);
    if (token) {
        var db = req.db;
        var title = req.body.title;
        var description = req.body.description;
        var new_post = new Post({
            title: title,
            description: description
        });

        new_post.save(function (error) {
            if (error) {
                console.log(error);
            }
            res.send({
                success: true
            });
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

//TODO ПРОВЕРИТЬ НЕОБХОДИМОСТЬ!
app.get('/users', (req, res) => {
    User.find({}, 'username password', function (error, user) {
        if (error) {
            console.error(error); 
        }
        res.send({
            user: user
        });
    }).sort({_id:-1});
});

app.post('/user_add', (req, res) => {
    var db = req.db;
    if (!req.body.username || !req.body.password) {
        res.json({success: false, msg: 'Please pass username and password.'});
    } else {
        var username = req.body.username;
        var password = req.body.password;
        var new_user = new User({
            username: username,
            password: password
        });
        new_user.save(function (err) {
            if (err) {
                return res.json({success: false, msg: 'Username already exists.'});
            }
            res.json({success: true, msg: 'Successful created new user.'});
        });
    }
});

app.post('/signin', function(req, res) {
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.sign(user.toJSON(), 'nodeauthsecret');
                    res.json({success: true, token: 'JWT ' + token});
                } else {
                    res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    }
    );
});

app.put('/posts/:id', passport.authenticate('jwt', { session: true}),(req, res) => {
    var token = getToken(req.headers);
    if (token) {
        var db = req.db;
        Post.findById(req.params.id, 'title description', function (error, post) {
            if (error) {
                console.error(error); 
            }

            post.title = req.body.title;
            post.description = req.body.description;
            post.save(function (error) {
                if (error) {
                    console.log(error);
                }
                res.send({
                    success: true
                });
            });
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

app.delete('/posts/:id', passport.authenticate('jwt', { session: true}),(req, res) => {
    var token = getToken(req.headers);
    if (token) {
        var db = req.db;
        Post.remove({
            _id: req.params.id
        }, function(err, post){
            if (err)
                res.send(err);
            res.send({
                success: true
            });
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

app.get('/post/:id', passport.authenticate('jwt', { session: true}),(req, res) => {
    var token = getToken(req.headers);
    if (token) {
        var db = req.db;
        Post.findById(req.params.id, 'title description', function (error, post) {
            if (error) {
                console.error(error); 
            }
            res.send(post);
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

app.post('/add_girl', passport.authenticate('jwt', { session: true}),(req, res) => {
    var token = getToken(req.headers);
    if (token) {
        var db = req.db;
        db.collection("girlTypes").findById({},{_id: req.params.id}).toArray(function(error, girlType) {
            if (error) {
                console.error(error);
            }
            var userId = req.user._id;
            var name = girlType.name;
            var price = girlType.price;
            var updatePrice = girlType.updatePrice;
            var incomeInHour = girlType.incomeInHour;
            var recoupment = girlType.recoupment;
            var newGirl = new Girl({
                userId: userId,
                name: name,
                price: price,
                initialIncomeInHour: incomeInHour,
                updatePrice: updatePrice,
                incomeInHour: incomeInHour,
                recoupment: recoupment,
            });
            newGirl.save(function (error) {
                if (error) {
                    console.log(error);
                }
                res.send({
                    success: true
                });
            });
        }).toArray();
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

app.get('/girlType', passport.authenticate('jwt', { session: true}),  (req, res) => {
    var token = getToken(req.headers);
    if (token) {
        db.collection("girlTypes").find({}).toArray(function(error, girlType) {
            if (error) {
                console.error(error);
            }
            res.send({
                girlType: girlType
            });
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

app.get('/girls', passport.authenticate('jwt', { session: true}),  (req, res) => {
    var token = getToken(req.headers);
    if (token) {
        Girl.find({userId: req.user._id}, 'price name updatePrice incomeInHour recoupment level', function (error, girls) {
            if (error) {
                console.error(error);
            }
            res.send({
                girls: girls
            });
        }).sort({_id: -1});
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

app.put('/girl/:id', passport.authenticate('jwt', { session: true}),  (req, res) => {
    var token = getToken(req.headers);
    if (token) {
        var db = req.db;
        const period = 180,
            hours = 24,
            koeff = 1.0075;
        Girl.findById(req.params.id, 'name level', function (error, girl) {
            if (error) {
                console.error(error); 
            }
            girl.level = girl.level + 1;
            girl.incomeInHour = girl.price / period / hours * (koeff ^ girl.level) + girl.level * girl.updatePrice / girl.price * girl.initialIncomeInHour * (koeff ^ girl.level);
            girl.recoupment = (girl.updatePrice + girl.price * girl.level)/girl.incomeInHour/hours;
            girl.save(function (error) {
                if (error) {
                    console.log(error);
                }
                res.send({
                    success: true
                });
            });
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

app.delete('/girl/:id', passport.authenticate('jwt', { session: true}),  (req, res) => {
    var token = getToken(req.headers);
    if (token) {
        var db = req.db;
        Girl.remove({
            _id: req.params.id
        }, function(err, girl){
            if (err)
                res.send(err);
            res.send({
                success: true
            });
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

app.delete('/sessions', passport.authenticate('jwt', { session: true}), function(req, res) {
    var token = getToken(req.headers);
    if (token) {// Удалить сессию
        if (req.session) {
            req.session.destroy(function() {});
        }
        res.send({
            success: true
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

app.listen(process.env.PORT || config.port,function(err){

    if (!err)

        console.log("Site is live");

    else console.log(err);

});