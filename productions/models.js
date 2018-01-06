'use strict';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const ProductionsSchema = mongoose.Schema({
    productionName: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    actors:{
        type: Array,
        required: true
    },
});

const Productions = mongoose.model('Productions', ProductionsSchema);

module.exports = {Productions};