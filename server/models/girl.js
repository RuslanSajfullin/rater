var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
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

module.exports = mongoose.model("Girl", UserSchema);
