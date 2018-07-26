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
var Girl = require("../models/girl");
var db = require("../config/db");
//TODO вынести апи в отдельную директорию

db.connect(db.connectSettings.dbSettings.uri, function(err) {
  if(err) {
      return console.log(err);
  }
    console.log("Connection Succeeded");
	  app.listen(process.env.PORT || db.connectSettings.port,function(err) {
			if (!err)
				console.log("Site is live");
			else console.log(err);
		})
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

app.get('/posts',  passport.authenticate('jwt', { session: true}),  postController.all);

app.get('/post/:id', passport.authenticate('jwt', { session: true}), postController.findById);

app.post('/add_post', passport.authenticate('jwt', { session: true}), postController.create);

app.put('/posts/:id', passport.authenticate('jwt', { session: true}), postController.update);

app.delete('/posts/:id', passport.authenticate('jwt', { session: true}), postController.delete);

//Girls methods

app.get('/girlType',  passport.authenticate('jwt', { session: true}), girlController.allTypes);


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
    	console.log(req.body);
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
                    var token = jwt.sign(user.toJSON(), 'nodeauthsecret1', { expiresIn: 900 });
                    res.json({success: true, token: 'JWT ' + token});
                } else {
                    res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    }
    );
});

app.post('/add_girl', passport.authenticate('jwt', { session: true}),(req, res) => {
    var token = getToken(req.headers);
    if (token) {
        db.get().collection("girlTypes").findById({},{_id: req.params.id}).toArray(function(error, girlType) {
            if (error) {
                console.error(error);
								res.status(500).send({
								success: false
							});
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
                    res.status(500).send({
                        success: false
                    });
                }
                res.status(200).send({
                    success: true
                });
            });
        }).toArray();
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
                res.status(500).send({
                    success: false
                });
            }
            res.status(200).send({
                success: true,
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
        const period = 180,
            hours = 24,
            koeff = 1.0075;
        Girl.findById(req.params.id, 'name level', function (error, girl) {
            if (error) {
                console.error(error); 
            }
            girl.level = girl.level + 1;
            girl.incomeInHour = girl.price / period / hours * (koeff ^ girl.level)
                + girl.level * girl.updatePrice / girl.price * girl.initialIncomeInHour * (koeff ^ girl.level);
            girl.recoupment = (girl.updatePrice + girl.price * girl.level)/girl.incomeInHour/hours;
            girl.save(function (error) {
                if (error) {
                    console.log(error);
                    res.status(500).send({
                        success: false
                    });
                }
                res.status(200).send({
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
        Girl.remove({_id: req.params.id}, function(err, girl){
            if (err)
                res.status(500).send({
                    success: false
                });
            res.status(200).send({
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