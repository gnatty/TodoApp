import React, { Component } from 'react'
import TodoController from './Todo.controller'

class TodoButtonAdd extends Component {

  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.createTodo = this.createTodo.bind(this)
    this.todosLength = this.todosLength.bind(this)

    this.state = {
      description: ''
    }

  }
  todosLength() {
    let tl = this.props.handler.state.todos.length
    if (tl > 0) {
      return (
        <strong>{tl} posts</strong>
      )
    } else {
      return (
        <strong>0 post</strong>
      )
    }
  }

  handleChange(e) {
    this.setState({
      description: e.target.value
    })
  }

  createTodo() {
    TodoController.create(this.state.description, this.props.handler)
  }

  render() {
    return (
      <div className="navbartodo">
        <nav className="level">
        <div className="level-left">
          <div className="level-item">
            <p className="subtitle is-5">{this.todosLength()}</p>
          </div>
          <div className="level-item">
            <div className="field has-addons">
              <p className="control">
                <input className="input" type="text" onChange={this.handleChange} />
              </p>
              <p className="control">
                <button className="button" onClick={this.createTodo}>Add</button>
              </p>
            </div>
          </div>
        </div>
        <div className="level-right">
          <p className="level-item"><strong>All</strong></p>
          <p className="level-item"><a>Done</a></p>
        </div>
        </nav>
      </div>
    )
  }
}

export default TodoButtonAdd
