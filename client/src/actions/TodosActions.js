import AppDispatcher from '../dispatcher/AppDispatcher'
import TodosConstants from '../constants/TodosConstants'
import request from 'superagent'

const tc = {
  host: 'http://127.0.0.1:3031/todo/',
  getall: 'getall',
  create: 'create',
  update_description: 'update',
  update_done: 'updatedone',
  delete: 'delete'
}

export default {

  getAll: () => {
    request
    .get(tc.host + tc.getall)
    .end((err, data) => {
      if(err) {
        AppDispatcher.dispatch({
          actionType: TodosConstants.GET_ALL_ERROR,
          message: err
        })
      } else {
        AppDispatcher.dispatch({
          actionType: TodosConstants.GET_ALL,
          todos: data.body.data
        })
      }
    })
  },

  create: (description) => {
    request
    .post(tc.host + tc.create)
    .send({
      description: description
    })
    .end(function(err, data){
      if(err) {
        AppDispatcher.dispatch({
          actionType: TodosConstants.CREATE_ERROR,
          message: err
        })
      } else {
        AppDispatcher.dispatch({
          actionType: TodosConstants.CREATE,
          todo: data.body
        })
      }
    })
  },

  updateDescription: (todoId, description) => {
    request
    .post(tc.host + tc.update_description)
    .send({
      todoId: todoId,
      description: description
    })
    .end(function(err, data){
      if(err) {
        AppDispatcher.dispatch({
          actionType: TodosConstants.UPDATE_DESCRIPTION_ERROR,
          message: err
        })
      } else {
        AppDispatcher.dispatch({
          actionType: TodosConstants.UPDATE_DESCRIPTION,
          todoId: todoId,
          description: description
        })
      }
    })
  },

  updateDone: (todoId, done) => {
    request
    .post(tc.host + tc.update_done)
    .send({
      todoId: todoId,
      done: done
    })
    .end(function(err, data){
      if(err) {
        AppDispatcher.dispatch({
          actionType: TodosConstants.UPDATE_DONE_ERROR,
          message: err
        })
      } else {
        AppDispatcher.dispatch({
          actionType: TodosConstants.UPDATE_DONE,
          todoId: todoId,
          done: done
        })
      }
    })
  },

  delete: (todoId) => {
    request
    .post(tc.host + tc.delete)
    .send({
      todoId: todoId,
    })
    .end(function(err, data){
      if(err) {
        AppDispatcher.dispatch({
          actionType: TodosConstants.DELETE_ERROR,
          message: err
        })
      } else {
        AppDispatcher.dispatch({
          actionType: TodosConstants.DELETE,
          todoId: todoId
        })
      }
    })
  },

  setDisplayType: (type) => {
    AppDispatcher.dispatch({
      actionType: TodosConstants.SET_DISPLAY_TYPE,
      type: type
    })
  }

}
