import React, { Component } from 'react'

class TodoLoader extends Component {

  render() {
    return (
      <div className="cs-loader">
        <div className="cs-loader-inner">
          <label>	●</label>
          <label>	●</label>
          <label>	●</label>
          <label>	●</label>
          <label>	●</label>
          <label>	●</label>
        </div>
      </div>
    )
  }

}

export default TodoLoader
