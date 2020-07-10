var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../model/usermodel');
var session = require('express-session');
var jwt = require('jsonwebtoken');
var secret = "harrypotter";

module.exports = function(app, passport) {

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true, cookie: { maxAge: 60000 } }));

    passport.serializeUser(function(user, done) {
        token = jwt.sign({ email: user.email, username: user.username }, secret, { expiresIn: '24h' });
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


    passport.use(new FacebookStrategy({
            clientID: "601260830529727",
            clientSecret: "b6326c31a2b0f2db2f6796097e437500",
            callbackURL: "http://localhost:8085/auth/facebook/callback",
            profileFields: ['id', 'displayName', 'photos', 'email']
        },
        function(accessToken, refreshToken, profile, done) {
            console.log(profile._json.email);
            User.findOne
            User.findOne({ email: profile._json.email }, 'email username password', function(err, user) {
                if (err) done(err);
                if (user && user != null) {
                    done(null, user);
                } else {
                    done(err);
                }
            })
        }
    ));


    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/facebookerror' }),
        function(req, res) {
            res.redirect('/facebook/' + token);
        });

    app.get('/auth/facebook',
        passport.authenticate('facebook', { scope: ['email'] }));


    return passport;
}