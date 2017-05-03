'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autoIncrement = require('mongoose-auto-increment')

var TodoSchema = new Schema({
  todoId: Number,
  description: String
})

autoIncrement.initialize(mongoose);

TodoSchema.plugin(autoIncrement.plugin, {
  model: 'Todo',
  field: 'todoId',
  startAt: 0,
  incrementBy: 1
})

module.exports = mongoose.model('Todo', TodoSchema)
