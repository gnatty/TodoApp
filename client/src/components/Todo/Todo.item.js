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
    this.editTodo = this.editTodo.bind(this)
    this.saveChangeTodo = this.saveChangeTodo.bind(this)
    this.actionEdit = this.actionEdit.bind(this)

    this.state = {
      edit: false
    }

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

  saveChangeTodo(e) {
    e.preventDefault();
    TodosActions.updateDescription(this.props.todo.todoId, this.refs.description.value)
    this.setState({
      edit: false
    })
  }

  actionEdit(e) {
    e.preventDefault();
    if(this.state.edit) {
      this.setState({
        edit: false
      })
    } else {
      this.setState({
        edit: true
      })
    }
  }

  editTodo() {
    if (this.state.edit === true) {
      return (
        <form>
        <div className="field has-addons">
          <p className="control is-expanded">
            <input className="input" type="text" ref="description" defaultValue={this.props.todo.description}/>
          </p>

          <p className="control">
            <button type="submit" className="button is-info" onClick={this.saveChangeTodo}>Save</button>
          </p>
          <p className="control">
            <button type="submit" className="button is-danger">Cancel</button>
          </p>
        </div>
        </form>
      )
    }
    return this.props.todo.description
  }

  onChange() {

  }

  render() {
    return (
      <nav className="level">
      <div className="level-left">
        <div className="level-item">
          <span className="panel-icon" onClick={this.delete}>
            <i className="fa fa-trash"></i>
          </span>
          <span className="panel-icon" onClick={this.actionEdit}>
            <i className="fa fa-pencil"></i>
          </span>

          {this.editTodo()}
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
