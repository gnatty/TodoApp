import React, { Component } from 'react'
import Alert from 'react-s-alert';

import './Todo.css'
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';

import TodosActions from '../../actions/TodosActions'
import TodosStore from '../../stores/TodosStore'

import TodoItem from './Todo.item'
import TodoButtonAdd from './Todo.button.add'


class Todo extends Component {

  constructor(props) {
    super(props)

    this.state = {
      todos: [],
      displayType: 'all',
      notification: []
    }

    this.onChange = this.onChange.bind(this)
    this.displayTodos = this.displayTodos.bind(this)
    this.createNotification = this.createNotification.bind(this)

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
      displayType: TodosStore.getDisplayType(),
      notification: TodosStore.getNotification()
    })

    /**
    * Notification here
    */
    this.createNotification()
  }

  createNotification() {
    switch(this.state.notification.type) {
      case 'SUCCESS':
        Alert.info(this.state.notification.message, {
          position: 'bottom-right',
          effect: 'bouncyflip',
          timeout: 2000
        });
      break;

      case 'ERROR':
      Alert.error(this.state.notification.message, {
        position: 'bottom-right',
        effect: 'bouncyflip',
        timeout: 2000
      });
    break;
    }
    this.setState({
      notification: []
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

        <Alert stack={{limit: 3}} />

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
