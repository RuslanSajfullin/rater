const mongoose = require('mongoose');

var state = {
    db: null
};

exports.connect = function(url, done) {
    if (state.db) {
        return done();
    }
	mongoose.connect(url, function (err, db){
		if (err) {
			return done(err);
		}
		state.db = db;
		done();
	})
};

exports.connectSettings = {
	name: 'rest-api',
	version: '0.0.1',
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 8081,
	dbSettings: {
		uri: 'mongodb://localhost:27017/rater',
		name: 'rater'
	}
};