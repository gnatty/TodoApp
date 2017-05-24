import React, { Component } from 'react'

import TodosActions from '../../actions/TodosActions'
import TodosStore from '../../stores/TodosStore'

class TodoItem extends Component {

  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)
    this.delete = this.delete.bind(this)
  }

  componentWillMount() {
    TodosStore.addChangeListener(this.onChange)
  }

  componentWillUnmount() {
    TodosStore.removeChangeListener(this.onChange);
  }

  delete() {
    TodosActions.delete(this.props.todo.todoId)
  }

  onChange() {

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
