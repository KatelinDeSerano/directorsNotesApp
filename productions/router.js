'use strict';
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const {Productions} = require('./models');


const router = express.Router();
const jsonParser = bodyParser.json();
router.use(jsonParser);

const jwtAuth = passport.authenticate('jwt', { session: false });

router.get('/director/:user', jwtAuth, (req, res) => {
    Productions
    .find({director:req.params.user})
    .exec()
    .then(productions => {
      res.status(200).json(productions);
    })
    .catch(err => {
      res.status(500).json({message: 'something went wrong'});
    })
  });

router.get('/actor/:user', jwtAuth, (req, res) => {
    Productions
    .find({actors:req.params.user})
    .exec()
    .then(productions => {
      res.status(200).json(productions);
    })
    .catch(err => {
      res.status(500).json(err);
    })
  });

router.post('/', jwtAuth, (req, res) => {
    const requiredFields = ['productionName', 'actors', 'director'];
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

router.delete('/:id', jwtAuth, (req, res) => {
    Productions
      .findByIdAndRemove(req.params.id)
      .then(() => {
        console.log(`Deleted Production with id \`${req.params.ID}\``);
        res.status(204).end();
      });
  });

module.exports = {router};