var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    userId: String,
    name: String,
    price: Number,
    initialIncomeInHour: Number,
    updatePrice: Number,
    incomeInHour: Number,
    recoupment: Number,
    level: { type: Number, default: 0 },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Girl", UserSchema);
