const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/posts');
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
    console.log("Connection Succeeded");
});

var User = require("../models/user");
var Post = require("../models/post");
var Girl = require("../models/girl");
//load passport strategies

require('../config/passport/passport.js')(passport);

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

// For Passport
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//Methods

app.get('/posts', passport.authenticate('jwt', { session: false}),  (req, res) => {
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

app.post('/add_post', (req, res) => {
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
});

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
                    // return the information including token as JSON
                    res.json({success: true, token: 'JWT ' + token});
                } else {
                    res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    }
    );
});

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

app.put('/posts/:id', (req, res) => {
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
});

app.delete('/posts/:id', (req, res) => {
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
});

app.get('/post/:id', (req, res) => {
    var db = req.db;
    Post.findById(req.params.id, 'title description', function (error, post) {
        if (error) {
            console.error(error); 
        }
        res.send(post);
    });
});


app.post('/add_girl', (req, res) => {
    var db = req.db;
    var name = "Asuna";
    var level = 1;
    var new_girl = new Girl({
        name: name,
        level: level
    });

    new_girl.save(function (error) {
        if (error) {
            console.log(error);
        }
        res.send({
            success: true
        });
    });
});

app.get('/girls', passport.authenticate('jwt', { session: false}),  (req, res) => {
    var token = getToken(req.headers);
    if (token) {
        Girl.find({}, 'name level', function (error, girls) {
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

app.put('/girls/:id', (req, res) => {
    var db = req.db;
    Girl.findById(req.params.id, 'name level', function (error, girl) {
        if (error) {
            console.error(error); 
        }

        girl.level = req.body.level;
        girl.save(function (error) {
            if (error) {
                console.log(error);
            }
            res.send({
                success: true
            });
        });
    });
});

app.delete('/girls/:id', (req, res) => {
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
});

app.listen(process.env.PORT || 8081,function(err){

    if (!err)

        console.log("Site is live");

    else console.log(err);

});