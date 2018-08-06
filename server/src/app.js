const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const app = express();
var User = require("../models/user");
var postController = require("../controllers/post");
var girlController = require("../controllers/girl");
var authController = require("../controllers/auth");
var db = require("../config/db");
//TODO вынести апи в отдельную директорию

db.connect(db.connectSettings.dbSettings.uri, function(err) {
    if (err) {
        return console.log(err);
    }
    console.log("Connection Succeeded");
    app.listen(process.env.PORT || db.connectSettings.port, function(err) {
        if (!err)
            console.log("Site is live");
        else console.log(err);
    });
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

//Posts methods

app.get('/posts',  passport.authenticate('jwt', { session: true}),  postController.findAll);

app.get('/post/:id', passport.authenticate('jwt', { session: true}), postController.findById);

app.post('/addPost', passport.authenticate('jwt', { session: true}), postController.create);

app.put('/posts/:id', passport.authenticate('jwt', { session: true}), postController.update);

app.delete('/posts/:id', passport.authenticate('jwt', { session: true}), postController.delete);

//Girls methods

app.get('/girlTypes',  passport.authenticate('jwt', { session: true}), girlController.findAllTypes);

app.get('/girls', passport.authenticate('jwt', { session: true}), girlController.findAllGirls);

app.post('/addGirl', passport.authenticate('jwt', { session: true}),girlController.create);

app.put('/girl/:id', passport.authenticate('jwt', { session: true}), girlController.update);

app.delete('/girl/:id', passport.authenticate('jwt', { session: true}), girlController.delete);

app.post('/signin', authController.signin);

//Balance calculating

var timerId = setTimeout(function tick() {
    User.find({}, 'username balance', function (error, user) {
        if (error) {
            console.error(error);
        }
        for (var i = 0; i < user.length; i++) {
            girlController.findGirlsBalances(user[i]);
        }
    });
    timerId = setTimeout(tick, 2000);
}, 2000);

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
