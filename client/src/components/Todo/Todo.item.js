import React, { Component } from 'react'
import TodoController from './Todo.controller'

class TodoItem extends Component {

  constructor(props) {
    super(props)
    this.delete = this.delete.bind(this)
  }

  delete() {
    TodoController.delete(this.props.todo.todoId, this.props.handler)
  }


  render() {
    return (
      <a className="panel-block">
        <span className="panel-icon" onClick={this.delete}>
          <i className="fa fa-close"></i>
        </span>
        {this.props.todo.description}
      </a>
    )
  }
}

export default TodoItem
