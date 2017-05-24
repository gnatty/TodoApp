import React, { Component } from 'react'

import TodosActions from '../../actions/TodosActions'
import TodosStore from '../../stores/TodosStore'

class TodoButtonAdd extends Component {

  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.createTodo = this.createTodo.bind(this)

    this.state = {
      description: ''
    }

  }

  componentWillMount() {
    TodosStore.addChangeListener(this.onChange)
  }

  componentWillUnmount() {
    TodosStore.removeChangeListener(this.onChange);
  }

  handleChange(e) {
    this.setState({
      description: e.target.value
    })
  }

  createTodo() {
    TodosActions.create(this.state.description)
  }

  onChange() {

  }

  render() {
    return (
      <div className="navbartodo">
        <nav className="level">
        <div className="level-left">
          <div className="level-item">
            <p className="subtitle is-5">0 post</p>
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
