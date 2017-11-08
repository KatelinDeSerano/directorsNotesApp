const express = require('express');
const {PORT, DATABASE_URL} = require('./config.js');

const app = express();
app.get('/', (req,res) => {res.status(200).send("hello world")});
app.listen(PORT, function() {
    console.log(`listening on port ${PORT}`)
});

module.exports = {app}