import AppDispatcher from '../dispatcher/AppDispatcher'
import TodosConstants from '../constants/TodosConstants'
import { EventEmitter } from 'events'

const CHANGE_EVENT = 'change'

let _todos = []
let _displayType = 'all';

function getDisplayType() {
  return _displayType;
}

function setDisplayType(displayType) {
  _displayType = displayType
}

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

function updateDone(todoId, done) {
  let todoIndex = _todos.findIndex(function(el) {
    return el.todoId === todoId
  })
  _todos[todoIndex].done = done
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

  getDisplayType() {
    return _displayType
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

    case TodosConstants.UPDATE_DONE:
      updateDone(action.todoId, action.done)
      TodosStore.emitChange()
    break;

    case TodosConstants.UPDATE_DONE_ERROR:
      // (..)
      TodosStore.emitChange()
    break;

    case TodosConstants.SET_DISPLAY_TYPE:
      setDisplayType(action.type)
      TodosStore.emitChange()
    break;

    default:
  }

})

export default TodosStore
