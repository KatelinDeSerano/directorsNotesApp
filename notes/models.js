'use strict';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const NotesSchema = mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  directorId: {
    type: String,
    required: true,
  },
  actorId: {
    type: String,
    required: true,
  },
  productionId: {
      type: String,
      required: true
  },
  directorName: {
    type: String,
    required: true,
  },
  actorName: {
    type: String,
    required: true,
  },
  productionName: {
      type: String,
      required: true
  },
  readStatus: {
      type: Boolean
  },
  created: {
      type: Date,
      default: Date.now
  }
});
// may need this later? Alter to specify which feilds to return
// NotesSchema.methods.apiRepr = function() {
//   return {
//     username: this.username || '',
//     firstName: this.firstName || '',
//     lastName: this.lastName || ''
//   };
// };

const Notes = mongoose.model('Notes', NotesSchema);

module.exports = {Notes};
