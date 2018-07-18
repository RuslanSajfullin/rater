var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    userId: String,
    name: String,
    level: Number,
    specification: [Schema.Types.ObjectId]
});

module.exports = mongoose.model("Girl", UserSchema);
