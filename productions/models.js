'use strict';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const ProductionsSchema = mongoose.Schema({
    productionId: {
        type: String,
        required: true
    },
    productionName: {
        type: String,
        required: true
    },
    directorId: {
        type: String,
        required: true
    },
    directorName: {
        type: String,
        required: true
    },
    actors:{
        type: Array,
        required: true
    }
});
// may need this later? Alter to specify which feilds to return
// ProductionSchema.methods.apiRepr = function() {
//   return {
//     username: this.username || '',
//     firstName: this.firstName || '',
//     lastName: this.lastName || ''
//   };
// };

const Productions = mongoose.model('Productions', ProductionsSchema);

module.exports = {Productions};