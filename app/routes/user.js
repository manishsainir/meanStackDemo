var express = require('express');
var jwt = require('jsonwebtoken');
var secret = "harrypotter";
var router = express.Router();
var model = require('../model/usermodel');



router.get('/home', (req, res) => res.send('hello world'));

router.post('/register', function(req, res) {
    var userModel = new model({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    if (userModel.email == "" || userModel.email == null || userModel.username == "" || userModel.username == null || userModel.password == "" || userModel.password == null) {
        res.json({ success: false, message: 'All field mandatory' });
    } else {
        userModel.save(function(err) {
            if (err) res.json({ success: false, message: 'please enter unique email and username' });
            else {
                res.json({ success: true, message: 'data saved successfully' });
            }
        });
    }

});
router.post('/login', function(req, res) {
    var userModel = {
        email: req.body.email,
        password: req.body.password
    };
    if (userModel.email == "" || userModel.email == null || userModel.password == "" || userModel.password == null) {
        res.json({ success: false, message: 'All field mandatory' });
    } else {
        model.findOne({ email: userModel.email }, function(err, data) {
            if (err) throw err;
            if (!data) res.json({ success: false, message: ' email is wrong. Please try again.' });
            else if (data) {
                var validPassword = data.comparePassword(userModel.password);
                if (!validPassword) {
                    res.json({ success: false, message: "you entered wrong password. Please try again." });
                } else {
                    var token = jwt.sign({ email: data.email, username: data.username }, secret, { expiresIn: '24h' });
                    res.json({ success: true, message: 'login successfull', token: token });
                }

            }
        })
    }

});

router.use(function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                res.json({ success: false, message: "Token invalid" });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.json({ success: false, message: "No Token Provided" });
    }
});

router.post('/me', function(req, res) {
    res.send(req.decoded);
});

module.exports = router;