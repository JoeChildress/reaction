import React, { Component } from 'react';
import { Route, Redirect } from 'react-router'


class EnterName extends Component {

    // constructor(props){
    //     super()

    // }

    render() {
        if (this.props.start === true){
            return <Redirect to='/GameOn' />
        }

        return <div>
            <h2>206-555-5555</h2>
            <p>Text your playername now.</p>
            <div>{this.props.count}</div>
            <div>Player list here</div>
        </div>
    }

    componentDidMount() {
        this.props.runEnterTimer()
    }

     componentDidUpdate() {
        this.props.checkEnterTimer()
     }
}

export default EnterName