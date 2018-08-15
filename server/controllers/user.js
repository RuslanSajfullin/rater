var User = require ("../models/user");
const jwt = require('jsonwebtoken');

exports.registration = function(req, res) {
    if (!req.body.username || !req.body.password) {
        res.json({success: false, msg: 'Please pass username and password.'});
    } else {
        var username = req.body.username;
        var password = req.body.password;
        var newUser = new User.newUser({
            username: username,
            password: password
        });
        newUser.save(function (err) {
            if (err) {
                return res.json({success: false, msg: 'Username already exists.'});
            }
            res.json({success: true, msg: 'Successful created new user.'});
        });
    }
};

exports.signin = function(req, res) {
    User.findByUsername(req.body.username, function(err, user) {
            if (err) throw err;
            if (!user) {
                res.status(401).
                    send({
                        success: false,
                        msg: 'Authentication failed. User not found.',
                    });
            } else {
                // check if password matches
                user.comparePassword(req.body.password, function(err, isMatch) {
                    if (isMatch && !err) {
                        // if user is found and password is right create a token
                        var token = jwt.sign(user.toJSON(), 'nodeauthsecret1',
                            {expiresIn: 900});
                        res.json({success: true, token: 'JWT ' + token});
                    } else {
                        res.status(401).
                            send({
                                success: false,
                                msg: 'Authentication failed. Wrong password.',
                            });
                    }
                });
            }
        },
    );
};

exports.findAll = function(req, res) {
    User.findAll(function(err, users) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send({
            users: users,
        });
    });

};
exports.find = function(req, res) {
    User.findByUsername(req.user.username, function(err, user) {
            if (err) throw err;
            if (!user) {
                res.send({
                    success: false,
                    msg: 'User not found.',
                });
            } else {
                res.send({
                    user: user,
                });
            }
        },
    );
};

exports.update = function(userId, userBalance) {
    User.findById(userId, function(error, user) {
        if (error) {
            console.error(error);
        }
        var newBalance = user.balance + userBalance;
        User.update(user, {balance: newBalance},
            function(error, result) {
                if (error) {
                    console.log(error);
                }
            });
    });
};

exports.delete = function(req, res) {
    User.delete(req.params.id, function(error, result) {
        if (error)
            res.send(error);
        res.send({
            success: true,
        });
    });
};
