'use strict';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const NotesSchema = mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true,
  },
  actor: {
    type: String,
    required: true,
  },
  production: {
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
// may need this later? 
// NotesSchema.methods.apiRepr = function() {
//   return {
//     username: this.username || '',
//     firstName: this.firstName || '',
//     lastName: this.lastName || ''
//   };
// };

const Notes = mongoose.model('Notes', NotesSchema);

module.exports = {Notes};

// {
//     "id": "123456",
//     "text": "You suck, do better",
//     "directorId": "abcdefg",
//     "directorName": "Steven Speilberg",
//     "actorId": "aaaaaa",
//     "actorName": "Dev Patel",
//     "productionId":"111111",
//     "publishedAt": 147001697669,
//     "readStatus": false
// },