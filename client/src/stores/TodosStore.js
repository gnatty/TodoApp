import AppDispatcher from '../dispatcher/AppDispatcher'
import TodosConstants from '../constants/TodosConstants'
import { EventEmitter } from 'events'

const CHANGE_EVENT = 'change'

let _todos = []

function setTodos(todos) {
  _todos = todos
}

function pushTodo(todo) {
  _todos.unshift(todo)
}

function deleteTodo(todoId) {
  _todos = _todos.filter(function(el) {
    return el.todoId !== todoId
  })
}

class TodosStoreClass extends EventEmitter {

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback)
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback)
  }

  getTodos() {
    return _todos
  }

}

const TodosStore = new TodosStoreClass();

TodosStore.dispatchToken = AppDispatcher.register(action => {

  switch(action.actionType) {

    case TodosConstants.GET_ALL:
      setTodos(action.todos)
      TodosStore.emitChange()
    break;

    case TodosConstants.GET_ALL_ERROR:
      alert(action.message)
      TodosStore.emitChange();
    break;

    case TodosConstants.CREATE:
      pushTodo(action.todo)
      TodosStore.emitChange()
    break;

    case TodosConstants.CREATE_ERROR:
      // (..)
      TodosStore.emitChange()
    break;

    case TodosConstants.DELETE:
      deleteTodo(action.todoId)
      TodosStore.emitChange()
    break;

    case TodosConstants.DELETE_ERROR:
      // (..)
      TodosStore.emitChange()
    break;

    default:
  }

})

export default TodosStore
