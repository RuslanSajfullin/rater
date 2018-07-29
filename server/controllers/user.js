var User = require ("../models/user");

exports.create = function (req, res) {
    if (!req.body.username || !req.body.password) {
        console.log(req.body);
        res.json({success: false, msg: 'Please pass username and password.'});
    } else {
        var username = req.body.username;
        var password = req.body.password;
        var newUser = User.newUser({
            username: username,
            password: password
        });
        User.create(newUser, function(error, result) {
            if (error) {
                return res.json(
                    {success: false, msg: 'Username already exists.'});
            }
            res.json({success: true, msg: 'Successful created new user.'});
        });
    }
};