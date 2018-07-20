var GirlType = require("../../models/girlType");
var mongoose = require('mongoose');
var db = mongoose.connection;

mongoose.connect('mongodb://localhost:27017/posts');
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback){
    console.log("Connection Succeeded");
});

GirlType.count({}, function(err, c) {
    if (c > 4) {
        console.log('Girls types already in db');
        db.close();
    } else {
        GirlType.insertMany([{ name: "Shere", price: 10, updatePrice: 5, incomeInHour: 0.00231, recoupment: 180},
            { name: "Kaori Nazuka", price: 50, updatePrice: 10, incomeInHour: 0.01255, recoupment: 166},
            { name: "Main", price: 100, updatePrice: 12, incomeInHour: 0.02588, recoupment: 161},
            { name: "Reone", price: 250, updatePrice: 25, incomeInHour: 0.06944, recoupment: 150},
            { name: "Asakawa", price: 500, updatePrice: 50, incomeInHour: 0.14881, recoupment: 140}], function(err) {
            if (err) throw err;
            console.log("Girls types inserted in db");
            db.close();
        });
    }
});



////"start": "node ./node_modules/nodemon/bin/nodemon.js config/referenceBooks/girlsTypeInsert.js src/app.js",
//    "start": "node ./node_modules/nodemon/bin/nodemon.js src/app.js",