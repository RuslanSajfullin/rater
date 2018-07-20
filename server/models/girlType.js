var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    price: Number,
    updatePrice: Number,
    incomeInHour: Number,
    recoupment: Number
});

module.exports = mongoose.model("GirlType", UserSchema);
