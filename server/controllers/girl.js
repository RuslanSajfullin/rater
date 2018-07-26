var Girl = require ("../models/girl");
var strategy = require("../config/passport/getToken");

exports.allTypes = function(req, res) {
	var token = strategy.getToken(req.headers);
	if (token) {
		Girl.allTypes(function(err, girlTypes) {
			if (err) {
				console.log(err);
				return res.sendStatus(500);
			}
			res.send({
				girlTypes: girlTypes
			});
		})
	}
	else {
		return res.status(403).send({success: false, msg: 'Unauthorized.'});
	}
};