var express = require('express');
var app = express();
var PORT = process.env.PORT || 9000;


app.listen(PORT, function(err){
    console.log('running server on port ' + PORT);
});

app.get('/', function(req, res) {
    res.send('Hello World');
 });

app.get('/signup', function(req, res) {
    res.send('Hello Sign Up');
 });

app.get('/login', function(req, res) {
    res.send('Hello Log In');
 });

app.get('/actor', function(req, res) {
    res.send('Hello Actor');
 });

app.get('/director', function(req, res) {
    res.send('Hello Director');
 });
 
// var {PORT, DATABASE_URL} = require('./config.js');
// landingpageRouter = require('./app.js');

// app.listen(PORT, function() {
//     console.log('listening on port' + PORT)
// });

