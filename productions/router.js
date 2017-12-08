'use strict';
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const {Productions} = require('./models');


const router = express.Router();
const jsonParser = bodyParser.json();

router.get('/', (req, res) => {
    Productions
    .find()
    .exec()
    .then(productions => {
      res.status(200).json(productions);
    })
    .catch(err => {
      res.status(500).json({message: 'something went wrong'});
    })
  });

router.post('/', jsonParser, (req, res) => {
    const requiredFields = ['productionName', 'actors'];
    for (let i = 0; i < requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`;
        console.error(message);
        return res.status(400).send(message);
      }
    }
  Productions.create(req.body)
    .then(production => {
      res.status(201).json(production);
    })
    .catch(err => {
      res.status(500).json({message: 'Something went wrong' });
    })
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