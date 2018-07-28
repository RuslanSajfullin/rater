var Post = require ("../models/post");
var strategy = require("../config/passport/getToken");

exports.findAll = function(req, res) {
	var token = strategy.getToken(req.headers);
    if (token) {
			Post.all(function(err, posts) {
				if (err) {
					console.log(err);
					return res.sendStatus(500);
				}
				res.send({
					posts: posts
				});
			})
		}
		else {
			return res.status(403).send({success: false, msg: 'Unauthorized.'});
		}
};

exports.findById = function(req, res) {
	var token = strategy.getToken(req.headers);
	if (token) {
		Post.findById(req.params.id, function(error, post) {
			if (error) {
				console.error(error);
				res.sendStatus(500);
			}
			res.send(post);
		})
	}
	else {
		return res.status(403).send({success: false, msg: 'Unauthorized.'});
	}
};

exports.create = function (req, res) {
	var token = strategy.getToken(req.headers);
	if (token) {
		var title = req.body.title;
		var description = req.body.description;
		var newPost = new Post.newPost({
			title: title,
			description: description
		});
		Post.create(newPost, function(error, result) {
			if (error) {
				console.log(error);
			}
			res.send({
				success: true
			});
		})
	}
	else {
		return res.status(403).send({success: false, msg: 'Unauthorized.'});
	}
};

exports.update = function(req, res) {
	var token = strategy.getToken(req.headers);
	if (token) {
	Post.update(Post.findById(req.params.id, function(error, post) {
		if (error) {
			console.error(error);
			res.sendStatus(500);
		}
		return post
	}), {title: req.body.title,description: req.body.description}, function(error, result) {
		if (error) {
			console.log(error);
		}
		res.send({
			success: true
		});
	})
	}
	else {
		return res.status(403).send({success: false, msg: 'Unauthorized.'});
	}
};

exports.delete = function(req, res) {
	var token = strategy.getToken(req.headers);
	if (token) {
		Post.delete(req.params.id, function(error, result) {
			if (error)
				res.send(error);
			res.send({
				success: true
			});
		})
	}
	else {
		return res.status(403).send({success: false, msg: 'Unauthorized.'});
	}
};