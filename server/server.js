// Plugins
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

// Files
const routes = require('./routes')

mongoose.connect('mongodb://localhost:3300/database')

mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection opened')
})


// to support JSON-encoded bodies
app.use(bodyParser.json())
// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

routes.config(app)

app.listen(3031, () => {
  console.log('listening on 3031')
})

module.exports = app
