var Girl = require ("../models/girl");
var strategy = require("../config/passport/getToken");

exports.findAllTypes = function(req, res) {
    var token = strategy.getToken(req.headers);
    if (token) {
        Girl.allTypes(function(err, girlTypes) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.send({
                girlTypes: girlTypes
            });
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
};

exports.findTypeById = function(req, res) {
    var token = strategy.getToken(req.headers);
    if (token) {
        Girl.findTypeById(req.body.id, function(error, girlType) {
            if (error) {
                console.error(error);
                res.sendStatus(500);
            }
            res.send(girlType);
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
};

exports.findAllGirls = function(req, res) {
    var token = strategy.getToken(req.headers);
    if (token) {
        Girl.allGirls(req.user._id, function(err, girls) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.send({
                girls: girls
            });
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
};

exports.findGirlsBalances = function(user) {
    Girl.allGirlsCalculate(user._id, function(err, girls) {
        if (err) {
            console.log(err);
        }
        var sum = 0;
        var timeNow = 0;
        for (var i = 0; i < girls.length; i++) {
            timeNow = Date.now();
            var time = timeNow - girls[i].chargeDate;
            sum = sum + girls[i].incomeInHour * time / 1000 / 60 / 60;
            //console.log(girls[i].chargeDate);
            Girl.update(girls[i], {
                chargeDate: timeNow
                }, function(error, result) {
                    if (error) {
                        console.log(error);
                    }
                }
            );
        }
        console.log(sum);
    });
};

exports.create = function (req, res) {
    var token = strategy.getToken(req.headers);
    if (token) {
        Girl.findTypeById(req.body.id, function(error, girlType) {
            if (error) {
                console.error(error);
            }
            var userId = req.user._id;
            var name = girlType[0].name;
            var price = girlType[0].price;
            var updatePrice = girlType[0].updatePrice;
            var incomeInHour = girlType[0].incomeInHour;
            var recoupment = girlType[0].recoupment;
            var newGirl = new Girl.Girl({
                userId: userId,
                name: name,
                price: price,
                initialIncomeInHour: incomeInHour,
                updatePrice: updatePrice,
                incomeInHour: incomeInHour,
                recoupment: recoupment,
            });
            Girl.create(newGirl, function(error, result) {
                if (error) {
                    console.log(error);
                    res.status(500).send({
                        success: false
                    });
                }
                res.status(200).send({
                    success: true
                });
            });
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
};

exports.update = function(req, res) {
    var token = strategy.getToken(req.headers);
    if (token) {
        const period = 180,
            hours = 24,
            koeff = 1.0075;
        var level = 0,
            incomeInHour = 0,
            recoupment = 0;
        Girl.findById(req.params.id, function(error, girl) {
            if (error) {
                console.error(error);
                res.sendStatus(500);
            }
            incomeInHour = (girl.price / period / hours * (koeff ^ girl.level))
								+ (girl.level * girl.updatePrice / girl.price *
								girl.initialIncomeInHour * (koeff ^ girl.level));
            recoupment = (girl.updatePrice + girl.price * girl.level) /
								girl.incomeInHour / hours;
            level = girl.level + 1;
            Girl.update(girl, {
                level: level,
                incomeInHour: incomeInHour,
                recoupment: recoupment
            }, function(error, result) {
                if (error) {
                    console.log(error);
                    res.status(500).send({
                        success: false
                    });
                }
                res.status(200).send({
                    success: true
                });
            }
            );
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
};

exports.delete = function(req, res) {
    var token = strategy.getToken(req.headers);
    if (token) {
        Girl.delete(req.params.id, function(error, result) {
            if (error)
                res.send(error);
            res.send({
                success: true
            });
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
};
