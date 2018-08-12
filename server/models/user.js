var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    balance : { type: Number, min: 0, default: 0},
    email: { type: String},
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    last_login: Date,
    active_status: { type: Boolean, default: true }
});

UserSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

var User = mongoose.model('User', UserSchema);

exports.newUser = User;

exports.findAll = function(cb) {
    User.find({}, 'username password', function(error, users) {
        cb(error, users);
    }).sort({_id: -1});
};

exports.findByUsername = function(username, cb) {
    User.findOne({username: username}, function(error, user) {
        cb(error, user);
    });
};

exports.findById = function(id, cb) {
    User.findById(id, function(error, user) {
        cb(error, user);
    });
};

exports.create = function(user, cb) {
    user.save(function(error, result) {
        cb(error, result);
    });
};

exports.delete = function(id, cb) {
    User.remove({
        _id: id,
    }, function(err, result) {
        cb(err, result);
    });
};

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

