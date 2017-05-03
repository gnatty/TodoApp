const todo = require('./../api/todo')

exports.config = (app) => {
  app.use('/todo', todo)
}
