import AppDispatcher from '../dispatcher/AppDispatcher'
import TodosConstants from '../constants/TodosConstants'
import request from 'superagent'

const tc = {
  host: 'http://127.0.0.1:3031/todo/',
  getall: 'getall',
  create: 'create',
  update: 'update',
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
  }

}
