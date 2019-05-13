import React, { Component } from 'react';
import PlayerList from './PlayerList';
import QuestionBox from './QuestionBox';

class Gameview extends Component {
    render() {
        return <div>
            <PlayerList/>
            <QuestionBox />
        </div>
    }

    componentDidMount() {
        this.props.changeMode()
    }
}

export default Gameview