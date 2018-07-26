var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var PostSchema = new Schema({
    title: String,
    description: String
});
var Post = mongoose.model("Post", PostSchema);

exports.newPost = Post;

exports.all = function(cb) {
	Post.find({}, 'title description', function (error, posts)  {
        cb(error,posts);
		}).sort({_id:-1});
};

exports.findById = function(id, cb) {
	Post.findById(id, 'title description', function (error, post) {
		    cb(error,post);
	});
};

exports.create = function(post, cb) {
	post.save(function (error, result) {
	    cb(error,result);
	});
};

exports.update = function(post, newData, cb) {
	Post.updateOne(post, newData, function (error, result) {
		cb(error,result);
	});
};

exports.delete = function(id, cb) {
	Post.remove({_id: id
	}, function(err, result){
        cb(err, result);
	});
};