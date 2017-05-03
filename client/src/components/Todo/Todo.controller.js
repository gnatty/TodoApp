import request from 'superagent'
import tc from './Todo.config.js'

const TodoController = {

  getAll: (props) => {
    request
    .get(tc.host + tc.getall)
    .end((err, data) => {
      if(err) {
        props.setState({
          error: {
            method: 'getAll'
          }
        })
      } else {
        props.setState({
          todos: data.body.data
        })
      }
    })
  },

  create: (description, handler) => {
    request
    .post(tc.host + tc.create)
    .send({
      description: description
    })
    .end(function(err, data){
      if(err) {
        console.log(err)
      } else {
        TodoController.createOne(data.body, handler)
      }
    })
  },

  delete: (todoId, handler) => {
    request
    .post(tc.host + tc.delete)
    .send({
      todoId: todoId
    })
    .end(function(err, data){
      if(err) {
        console.log(err)
      } else {
        TodoController.deleteOne(todoId, handler)
      }
    })
  },

  deleteOne: (todoId, handler) => {
    let todos = handler.state.todos.filter(function(el) {
      return el.todoId !== todoId
    })

    handler.setState({
      todos: todos
    })
  },

  createOne: (todo, handler) => {
    handler.setState((prevState) => ({
      todos: prevState.todos.concat(todo)
    }))
  }

}

export default TodoController
