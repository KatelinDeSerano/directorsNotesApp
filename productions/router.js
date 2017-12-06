'use strict';
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const {Productions} = require('./models');


const router = express.Router();

router.get('/', (req, res) => {
    Productions
      .findById(req.params.id)
      .then(post => res.json(post.apiRepr()))
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'something went wrong' });
      });
  });

router.post('/', (req, res) => {
    const requiredFields = ['productionName', 'actors'];
    for (let i = 0; i < requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`;
        console.error(message);
        return res.status(400).send(message);
      }
    }
  Productions
    .create({
      productionName: req.body.productionName,
      directorName: req.body.directorName,
      actors: req.body.actors
    })
    .then(productions => res.status(201).json(productions.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
    });
});

router.delete('/:id', (req, res) => {
    Productions
      .findByIdAndRemove(req.params.id)
      .then(() => {
        console.log(`Deleted Production with id \`${req.params.ID}\``);
        res.status(204).end();
      });
  });

module.exports = {router};