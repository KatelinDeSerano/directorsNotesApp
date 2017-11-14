var express = require('express');
var app = express();
var PORT = process.env.PORT || 9000;

var signupRouter = express.Router();

app.listen(PORT, function(err){
    console.log('running server on port ' + PORT);
});

app.use(express.static('public'));


app.get('/', function(req, res) {
    res.send('index');
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
 


