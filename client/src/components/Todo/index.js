import React, { Component } from 'react'
import './Todo.css'
import TodoItem from './Todo.item'

import TodosActions from '../../actions/TodosActions'
import TodosStore from '../../stores/TodosStore'

import TodoButtonAdd from './Todo.button.add'

class Todo extends Component {

  constructor(props) {
    super(props)

    this.state = {
      todos: [],
      displayType: 'all'
    }

    this.onChange = this.onChange.bind(this)
    this.displayTodos = this.displayTodos.bind(this)
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
      todos: TodosStore.getTodos(),
      displayType: TodosStore.getDisplayType()
    })
  }

  displayTodos() {
    let displayTodos = []
    switch(this.state.displayType) {
      case 'all':
        displayTodos = this.state.todos
      break;

      case 'done':
        displayTodos = this.state.todos.filter(function(el) {
          return el.done === true
        })
      break;

      case 'notdone':
        displayTodos = this.state.todos.filter(function(el) {
          return el.done === false
        })
      break;
    }
    return displayTodos
  }

  render() {
    return (
      <div className="Todo">

        <TodoButtonAdd totalItems={this.state.todos.length}></TodoButtonAdd>


        <div className="container section">

          <div className="columns">
            <div className="column is-12">
              {this.displayTodos().map(todo => (
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
