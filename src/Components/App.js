import React, { Component } from 'react';
import '../App.css';
import Title from './Title'
import Overview from './Overview'
import Gameview from './Gameview'
import EnterName from './EnterName'
import {Route, Link} from 'react-router-dom'

class App extends Component {
  constructor() {
    super()
    this.state = {
      start: 'overview'
    }
  }

  render() {
  
    return (
      <div className="App">
      <Title></Title>
      <Route exact path='/' render = {() => (
        <div>
						<div>
              <Overview></Overview>
						</div>
            <div>
            <EnterName></EnterName>
          </div>
        </div>

				)} /> 
        <Route exact path='/GameOn' render = {() => (
						<div>
              {/* <PhotoWall {...this.props} /> */}
              <Gameview></Gameview>
						</div>
				)} /> 

      </div>
    );
  }
}

export default App;
