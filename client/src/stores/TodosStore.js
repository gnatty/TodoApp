import AppDispatcher from '../dispatcher/AppDispatcher'
import TodosConstants from '../constants/TodosConstants'
import { EventEmitter } from 'events'

const CHANGE_EVENT = 'change'

let _todos = []

function setTodos(todos) {
  _todos = todos
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

    default:
  }

})

export default TodosStore
