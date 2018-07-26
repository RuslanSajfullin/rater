var db = require("../config/db");
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

exports.newPost = Girl;

exports.allTypes = function(cb) {
	db.get().collection("girlTypes").find({}).toArray(function(error, girlTypes) {
		cb(error,girlTypes);
	});
};
