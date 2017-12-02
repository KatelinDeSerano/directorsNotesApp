'use strict';
const express = require('express');
const passport = require('passport');
const bodyParser = require('bodyParser');
const Notes = require('./models');

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


// incomplete POST request to create new notes
app.post('/notes', jsonParser, (req,res) => { 
 const requiredFields = ['actorName', 'text'];
 for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
        if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`
        console.error(message);
        return res.status(400).send(message);
        }
    }
    const note = Note.create(req.body.actorName, req.body.text);
    res.status(201).json(note);
})