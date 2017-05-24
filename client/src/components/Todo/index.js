import React, { Component } from 'react'
import './Todo.css'
import TodoItem from './Todo.item'

import TodosActions from '../../actions/TodosActions'
import TodosStore from '../../stores/TodosStore'



class Todo extends Component {

  constructor(props) {
    super(props)

    this.state = {
      todos: []
    }

    this.onChange = this.onChange.bind(this)
  }

  componentWillMount() {
    TodosStore.addChangeListener(this.onChange)
  }

  componentDidMount() {
    TodosActions.getAll()
  }

  componentWillUnmount() {
    TodosStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      todos: TodosStore.getTodos()
    })
  }

  render() {
    return (
      <div className="Todo">
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
