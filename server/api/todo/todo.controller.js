'use strict'

const todo = require('./todo.model')
const maxItemsPerPage = 5

const TodoController = {

  ping: (req, res) => {
    res.json("pong")
  },

  getAll: (req, res) => {
    let query = todo.find().select('todoId description')
    query.exec((err, todos) => {
      let nextCursor = todos.length
      if (todos.length == maxItemsPerPage) nextCursor +1
      else nextCursor = 0
      res.json({
        nextCursor: nextCursor,
        data: todos
      })
    })
  },

  getOne: (req, res) => {
    let query = todo.findOne({todoId: req.params.todoId}).select('todoId description')
    query.exec((err, todo) => {
      if (todo == null) res.status(500).json({status: 500, message: "Item not found"})
      else res.json(todo)
    })
  },

  create: (req, res) => {
    todo.create({description: req.body.description},
      function(err, sm) {
        if (err) {
          res.status(500).send(err)
        } else {
          console.log(sm)
          res.json(sm)
        }
      })
    ;
    console.log("/create: " + req.body.description)
  },

  update: (req, res) => {
    todo.update({ todoId: req.body.todoId }, { $set: { description: req.body.description }}, () => {
      res.json("ok")
    })
  },

  delete: (req, res) => {
    let query = todo.findOne({todoId: req.body.todoId}).select('todoId description').remove()
    query.exec((err, todo) => {
      if (todo == null) res.status(500).json({status: 500, message: "Item not found"})
      else res.json(todo)
    })
  }
}

module.exports = TodoController
