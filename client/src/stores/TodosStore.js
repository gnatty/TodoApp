import AppDispatcher from '../dispatcher/AppDispatcher'
import TodosConstants from '../constants/TodosConstants'
import { EventEmitter } from 'events'

const CHANGE_EVENT = 'change'

let _todos = []
let _displayType = 'all';
let _notification = [];

function getNotification() {
  return _notification;
}

function setNotification(type, message) {
  _notification.type = type
  _notification.message = message
}

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

function updateDescription(todoId, description) {
  let todoIndex = _todos.findIndex(function(el) {
    return el.todoId === todoId
  })
  _todos[todoIndex].description = description
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

  getNotification() {
    return _notification
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
      setNotification("ERROR", "database is not connected")
      TodosStore.emitChange();
    break;

    case TodosConstants.CREATE:
      setNotification("SUCCESS", "new todo created")
      pushTodo(action.todo)
      TodosStore.emitChange()
    break;

    case TodosConstants.CREATE_ERROR:
      setNotification("ERROR", "database is not connected")
      TodosStore.emitChange()
    break;

    case TodosConstants.DELETE:
      setNotification("SUCCESS", "todo removed")
      deleteTodo(action.todoId)
      TodosStore.emitChange()
    break;

    case TodosConstants.DELETE_ERROR:
      setNotification("ERROR", "todo couldn't be removed")
      TodosStore.emitChange()
    break;

    case TodosConstants.UPDATE_DONE:
      setNotification("SUCCESS", "todo's set to done")
      updateDone(action.todoId, action.done)
      TodosStore.emitChange()
    break;

    case TodosConstants.UPDATE_DONE_ERROR:
      setNotification("ERROR", "todo's set to notDone")
      TodosStore.emitChange()
    break;

    case TodosConstants.SET_DISPLAY_TYPE:
      setDisplayType(action.type)
      TodosStore.emitChange()
    break;

    case TodosConstants.UPDATE_DESCRIPTION:
      setNotification("SUCCESS", "todo's description updated")
      updateDescription(action.todoId, action.description)
      TodosStore.emitChange()
    break;

    case TodosConstants.UPDATE_DESCRIPTION_ERROR:
      setNotification("ERROR", "error while editing todo's description")
      TodosStore.emitChange()
    break;

    default:
  }

})

export default TodosStore
