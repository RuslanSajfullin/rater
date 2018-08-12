var User = require ("../models/user");

exports.registration = function(req, res) {
    if (!req.body.username || !req.body.password) {
        res.json({success: false, msg: 'Please pass username and password.'});
    } else {
        var username = req.body.username;
        var password = req.body.password;
        var newUser = new User({
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
