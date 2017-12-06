'use strict';
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const {Notes} = require('./models');

const router = express.Router();
const jsonParser = bodyParser.json();

router.get('/', function(req, res) {
    Notes
    .find()
    .exec()
    .then(notes => {
        res.status(200).json(notes);
    })
    .catch(err => {
        res.status(500).json({message: 'internal server error'});
    })
});

router.post('/', jsonParser,(req,res) => { 
 const requiredFields = ['actorName', 'text'];
 for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
        if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`
        console.error(message);
        return res.status(400).send(message);
        }
    }
    Notes.create(req.body)
    .then(note => {
        res.status(201).json(note);
    })
    .catch(err => {
        res.status(500).json({message:"internal server error"});
    })
});

router.delete('/:id', (req, res) => {
    Notes
      .findByIdAndRemove(req.params.id)
      .then(() => {
        res.status(204).json({ message: 'success' });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'something went terribly wrong' });
      });
  });

  router.put('/:id', jsonParser, (req, res) => {
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
      res.status(400).json({
        error: 'Request path id and request body id values must match'
      });
    }
    const updated = {};
    const updateableFields = ['text'];
    updateableFields.forEach(field => {
      if (field in req.body) {
        updated[field] = req.body[field];
      }
    });
  
    Notes
      .findByIdAndUpdate(req.params.id, { $set: updated }, { new: true })
      .then(updatedPost => res.status(200).json(updatedPost))
      .catch(err => res.status(500).json({ message: 'Something went wrong' }));
  });

module.exports = {router};