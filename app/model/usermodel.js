var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var schema = mongoose.Schema;

var userSchema = new schema({
    email: { type: String, index: true, unique: true },
    username: { type: String, unique: true },
    password: String
})

userSchema.pre('save', function(next) {
    var user = this;
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

var model = mongoose.model('Users', userSchema);

module.exports = model;