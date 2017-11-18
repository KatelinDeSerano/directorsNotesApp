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

 app.get('/users', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ users: users}));
 });


app.get('/notes', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ notes: notes}));
 });

 app.get('/productions', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ productions: productions}));
 });


 var productions = [
    
        {
            "id": "111111",
            "productionName": "Harvey",
            "directorId": "a1a1a1",
            "actors": [
                "Dev Patel",
                "Taylor Swift",
                "Tom Hiddleston" ],            
        },
        {
            "id": "222222",
            "productionName": "The Glass Menagerie",
            "directorId": "a1a1a1",
            "actors": [
                "Dev Patel",
                "Taylor Swift",
                "Tom Hiddleston" ],            
        },
        {
            "id": "333333",
            "productionName": "The Odyssey",
            "directorId": "a1a1a1",
            "actors": [
                "Dev Patel",
                "Taylor Swift",
                "Tom Hiddleston" ],            
        },
    ]
;

 var notes = [
    
        {
            "id": "123456",
            "text": "You suck, do better",
            "directorId": "abcdefg",
            "directorName": "Steven Speilberg",
            "actorId": "aaaaaa",
            "actorName": "Dev Patel",
            "productionId":"111111",
            "publishedAt": 147001697669,
            "readStatus": false
        },
        {
            "id": "131313",
            "text": "learn to sing",
            "directorId": "hijklmn",
            "directorName": "Paul Finocchiaro",
            "actorId": "bbbbbb",
            "actorName": "Taylor Swift",
            "productionId":"222222",
            "publishedAt": 147001697669,
            "readStatus": false
        },
        {
            "id": "454545",
            "text": "be aware of where you are putting your cigarette",
            "directorId": "abcdefg",
            "directorName": "Steven Speilberg",
            "actorId": "aaaaaa",
            "actorName": "Dev Patel",
            "productionId":"111111",
            "publishedAt": 147001697669,
            "readStatus": true
        }
    ];

    var users = [
        {
            "id": "aaaaaa",
            "name": "Dev Patel",
            "type": "actor"
        },
        {
            "id": "bbbbbb",
            "name": "Taylor Swift",
            "type": "actor"
        },
        {
            "id": "cccccc",
            "name": "Tom Hiddleston",
            "type": "actor"
        },
        {
            "id": "hijklmn",
            "name": "Paul Finocchiaro",
            "type": "director"
        },
        {
            "id": "abcdefg",
            "name": "Steven Speilberg",
            "type": "director"
        }
    
    ]

 


