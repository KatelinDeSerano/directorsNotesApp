'use strict';
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const {Notes} = require('./models');

const router = express.Router();
const jsonParser = bodyParser.json();

// add authentication 

router.get('/', function(req, res) {
  console.log(req.query.actor);
    Notes
    .find({actor: req.query.actor, productionId: req.query.productionId})
    .exec()
    .then(notes => {
        res.status(200).json(notes);
    })
    .catch(err => {
        res.status(500).json({message: 'internal server error'});
    })
});

router.post('/', jsonParser,(req,res) => { 
 const requiredFields = ['director', 'production','actor', 'text'];
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

  console.log("puttin"+req.params.id);
  
  if (!req.params.id) {
    res.status(400).json({
      error: 'No id found'
    });
  }
  // const updated = {};
  // const updateableFields = ['text','readStatus'];
  // updateableFields.forEach(field => {
  //   if (field in req.params.id) {
  //     console.log("printing" + field);
  //     updated[field] = req.body[field];
  //   }
  // });
  
    Notes
      .findByIdAndUpdate(req.params.id, { $set: {readStatus:true} }, { new: true })
      .then(updatedPost => res.status(200).json(updatedPost))
      .catch(err => res.status(500).json({ message: 'Something went wrong' }));
  });

module.exports = {router};