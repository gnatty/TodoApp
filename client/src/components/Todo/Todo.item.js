import React, { Component } from 'react'

import TodosActions from '../../actions/TodosActions'
import TodosStore from '../../stores/TodosStore'

class TodoItem extends Component {

  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)
    this.delete = this.delete.bind(this)
    this.updateDone = this.updateDone.bind(this)
    this.iconeDone = this.iconeDone.bind(this)

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

  updateDone() {
    let valueDone = this.props.todo.done === true ? false : true;
    TodosActions.updateDone(this.props.todo.todoId, valueDone)
  }

  iconeDone() {
    return this.props.todo.done === true ? "fa fa-check-circle-o" : "fa fa-circle-o";
  }

  onChange() {

  }

  render() {
    return (
      <nav className="level">
      <div className="level-left">
        <div className="level-item">
          <span className="panel-icon" onClick={this.delete}>
            <i className="fa fa-close"></i>
          </span>
          {this.props.todo.description}
        </div>
      </div>
      <div className="level-right">
        <div className="level-item">
          <label className="checkbox">
            <i className={this.iconeDone()} onClick={this.updateDone}></i>
          </label>
        </div>
      </div>
    </nav>
    )
  }
}

export default TodoItem
