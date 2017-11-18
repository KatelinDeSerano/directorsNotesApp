var express = require('express');
var app = express();
var PORT = process.env.PORT || 9000;

var signupRouter = express.Router();

app.listen(PORT, function(err){
    console.log('running server on port ' + PORT);
});

app.use(express.static('public'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', function(req, res) {
    res.send('index');
 });

app.get('/actor', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ notes: notes}));
 });

app.get('/director', function(req, res) {
    res.send('Hello Director');
 });

 var notes = [
    
        {
            "id": "111111",
            "text": "You suck, do better",
            "authorId": "a1a1a1",
            "authorName": "Steven Speilberg",
            "actorId": "aaaaaa",
            "actorName": "Dev Patel",
            "productionId":"123456",
            "productionName": "Harvey",
            "publishedAt": 147001697669,
            "readStatus": false
        },
        {
            "id": "222222",
            "text": "learn to sing",
            "authorId": "b2b2b2",
            "authorName": "Paul Finocchiaro",
            "actorId": "bbbbbb",
            "actorName": "Taylor Swift",
            "productionId":"654321",
            "productionName": "Miss Siagon",
            "publishedAt": 147001697669,
            "readStatus": false
        },
        {
            "id": "333333",
            "text": "be aware of where you are putting your cigarette",
            "authorId": "a1a1a1",
            "authorName": "Steven Speilberg",
            "actorId": "aaaaaa",
            "actorName": "Dev Patel",
            "productionId":"123456",
            "productionName": "Harvey",
            "publishedAt": 147001697669,
            "readStatus": true
        }
    ]
;

 


