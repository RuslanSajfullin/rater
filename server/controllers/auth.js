var User = require("../models/user");
const jwt = require('jsonwebtoken');

exports.signin = function(req, res) {
    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) throw err;
        if (!user) {
            res.status(401).
                send({
                    success: false,
                    msg: 'Authentication failed. User not found.'
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
                            msg: 'Authentication failed. Wrong password.'
                        });
                }
            });
        }
    }
    );
};
