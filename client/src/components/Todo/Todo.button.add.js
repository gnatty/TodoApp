import React, { Component } from 'react'

import TodosActions from '../../actions/TodosActions'
import TodosStore from '../../stores/TodosStore'

class TodoButtonAdd extends Component {

  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.createTodo = this.createTodo.bind(this)
    this.totalItems = this.totalItems.bind(this)
    this.setDisplayType = this.setDisplayType.bind(this)
    this.setClassAction = this.setClassAction.bind(this)

    this.state = {
      description: '',
      displayType: 'all'
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

  totalItems() {
    let total = this.props.totalItems
    if (total === 0) {
      return (<b>0 post</b>)
    }
    return (<b>{total} posts</b>)
  }

  setDisplayType(type) {
    TodosActions.setDisplayType(type)
  }

  setClassAction(type) {
    if(this.state.displayType == type) {
      return "button is-success"
    }
    return ""
  }

  onChange() {
    this.setState({
      displayType: TodosStore.getDisplayType()
    })
  }

  render() {
    return (
      <div className="navbartodo">
        <nav className="level">
        <div className="level-left">
          <div className="level-item">
            <p className="subtitle is-5">{this.totalItems()}</p>
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
          <p className="level-item" onClick={() => this.setDisplayType("all")}><b className={this.setClassAction("all")}>All</b></p>
          <p className="level-item" onClick={() => this.setDisplayType("done")}><b className={this.setClassAction("done")}> Done</b></p>
          <p className="level-item" onClick={() => this.setDisplayType("notdone")}><b className={this.setClassAction("notdone")}>NotDone</b></p>
        </div>
        </nav>
      </div>
    )
  }
}

export default TodoButtonAdd
