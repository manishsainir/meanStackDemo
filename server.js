var express = require('express');
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');
var path = require('path');
var passport = require('passport');
var social = require('./app/passport/passport')(app, passport);

// var bodyParser = require('body-parser');
var userRoutes = require('./app/routes/user');
var Port = process.env.PORT || 8085;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use('/user', userRoutes);
app.use(express.static(path.join(__dirname + '/public')));
app.use('/angular', express.static(__dirname + '/node_modules/angular'));
app.use('/angularRoutes', express.static(__dirname + '/node_modules/angular-route'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery'));

mongoose.connect('mongodb://localhost:27017/MeanStackDemo', { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if (err) console.log('mongoose not connected');
    console.log('mongoose connected');
})
mongoose.set("useCreateIndex", true);
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'))
})

app.listen(Port, function() {
    console.log('server is running on: ' + Port);
});