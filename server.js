'use strict';
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
const { router: usersRouter } = require('./users');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');

mongoose.Promise = global.Promise;

const app = express();
const {PORT, DATABASE_URL} = require('./config');

var signupRouter = express.Router();

app.use(morgan('common'));

app.use(express.static('public'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/users/', usersRouter);
app.use('/auth/', authRouter);

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

app.get('/note', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    let notesArray = [];
    let productionId = req.query.id;
    for (let i=0; i<notes.length; i++) {
        if (productionId===notes[i].productionId && notes[i].actorId==="aaaaaa") {
            notesArray.push(notes[i].text);
        }

    }
    res.send(notesArray);
});

app.get('/productions', function(req, res) {
    res.setHeader('Content-Type', 'application/json'); 
    res.send(JSON.stringify({ productions: productions}));
});

// Referenced by both runServer and closeServer. closeServer
// assumes runServer has run and set `server` to a server object
let server;

function runServer() {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, { useMongoClient: true }, err => {
      if (err) {
        return reject(err);
      }
      server = app
        .listen(PORT, () => {
          console.log(`Your app is listening on port ${PORT}`);
          resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };


var productions = [

    {
        "productionId": "111111",
        "productionName": "Harvey",
        "directorId": "a1a1a1",
        "actors": [
            "Dev Patel",
            "Taylor Swift",
            "Tom Hiddleston" ],            
    },
    {
        "productionId": "222222",
        "productionName": "The Glass Menagerie",
        "directorId": "a1a1a1",
        "actors": [
            "Dev Patel",
            "Taylor Swift",
            "Tom Hiddleston" ],            
    },
    {
        "productionId": "333333",
        "productionName": "The Odyssey",
        "directorId": "a1a1a1",
        "actors": [
            "Dev Patel",
            "Taylor Swift",
            "Tom Hiddleston" ],            
    }
];

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
    },
    {
        "id": "237549",
        "text": "Jump higher",
        "directorId": "hijklmn",
        "directorName": "Paul Finocchiaro",
        "actorId": "aaaaaa",
        "actorName": "Dev Patel",
        "productionId":"222222",
        "publishedAt": 147001697669,
        "readStatus": true
    },
    {
        "id": "102938",
        "text": "Move faster from point A to point B",
        "directorId": "hijklmn",
        "directorName": "Paul Finocchiaro",
        "actorId": "aaaaaa",
        "actorName": "Dev Patel",
        "productionId":"222222",
        "publishedAt": 147001697669,
        "readStatus": true
    },
    {
        "id": "564738",
        "text": "Think Greek",
        "directorId": "abcdefg",
        "directorName": "Steven Speilberg",
        "actorId": "aaaaaa",
        "actorName": "Dev Patel",
        "productionId":"333333",
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

];

 


