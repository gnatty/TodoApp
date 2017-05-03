import React, { Component } from 'react'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Todo from './components/Todo'

class App extends Component {

  render() {
    return (
      <Todo />
    );
  }
}

export default App;
