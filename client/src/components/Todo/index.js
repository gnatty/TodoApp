import React, { Component } from 'react'
import './Todo.css'
import TodoButtonAdd from './Todo.button.add'
import TodoItem from './Todo.item'
import TodoController from './Todo.controller'
class Todo extends Component {

  constructor(props) {
    super(props)

    this.state = {
      todos: [],
      handler: this
    }
  }

  componentWillMount() {
    TodoController.getAll(this)
  }

  render() {
    return (
      <div className="Todo">
        <TodoButtonAdd
        handler={this.state.handler}
        />
        <div className="container section">
          <div className="columns">
            <div className="column is-12">
              {this.state.todos.map(todo => (
                <TodoItem
                key={todo.todoId}
                todo={todo}
                handler={this.state.handler}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Todo
