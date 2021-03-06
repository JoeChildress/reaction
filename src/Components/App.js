import React, { Component } from 'react';
import '../App.css';
import Title from './Title'
import Overview from './Overview'
import Gameview from './Gameview'
import EnterName from './EnterName'
import {Route, Link} from 'react-router-dom'
import helpers from '../helpers'

class App extends Component {
  constructor() {
    super()
    this.state = {
      players: [],
      count: 8,
      start: false,
      gameCount: 10,
      gameMode: 'addPlayer',
      timeStamp: new Date()
    }
    this.runEnterTimer = helpers.runEnterTimer.bind(this)
    this.checkEnterTimer = helpers.checkEnterTimer.bind(this)
    this.changeMode = helpers.changeMode.bind(this)
  }

  render() {
  
    return (
      <div className="App">
      
        <Title></Title>

        <Route exact path='/' render = {() => (
          <div>
            <Overview></Overview>
          </div>
        )} /> 

        <Route path='/Enter' render = {() => (
          <div> 
            <EnterName runEnterTimer={this.runEnterTimer} checkEnterTimer={this.checkEnterTimer} count={this.state.count} start={this.state.start}>
            {/* <EnterName runEnterTimer={this.runEnterTimer} checkEnterTimer={this.checkEnterTimer} {...this.state}> */}
            </EnterName>
          </div>
        )} />

        <Route path='/GameOn' render = {() => (
          <div>
            <Gameview changeMode={this.changeMode}></Gameview>
          </div>
        )} />

      </div>
    );
  }
}

export default App;
