var db = require("../config/db");
var ObjectId = require("mongodb").ObjectId;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var GirlSchema = new Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    initialIncomeInHour: { type: Number, required: true },
    updatePrice: { type: Number, required: true },
    incomeInHour: { type: Number, required: true },
    recoupment: { type: Number, required: true },
    level: { type: Number, required: true, default: 0, max: 10, min: 0 },
    created: {
        required: true,
        type: Date,
        default: Date.now
    }
});

var Girl = mongoose.model("Girl", GirlSchema);

exports.Girl = Girl;

exports.allTypes = function(cb) {
	db.get().collection("girlTypes").find({}).toArray(function(error, girlTypes) {
		cb(error,girlTypes);
	});
};

exports.findTypeById = function(id, cb) {
	db.get().collection("girlTypes").find({_id: ObjectId(id)}).toArray(function(error, girlType) {
    cb(error,girlType);
	});
};

exports.findById = function(id, cb) {
	Girl.findById(id, function (error, girl) {
		cb(error,girl);
	});
};

exports.allGirls = function(id, cb) {
	Girl.find({userId: id}, 'price name updatePrice incomeInHour recoupment level created', function (error, girls)  {
		cb(error,girls);
	}).sort({_id:-1});
};

exports.create = function(girl, cb) {
	girl.save(function (error, result) {
		cb(error,result);
	});
};

exports.update = function(girl, newData, cb) {
	Girl.updateOne(girl, newData, function (error, result) {
		console.log("controller");
		console.log(girl);
		console.log(newData);
		cb(error,result);
	});
};

exports.delete = function(id, cb) {
	Girl.remove({_id: id
	}, function(err, result){
		cb(err, result);
	});
};