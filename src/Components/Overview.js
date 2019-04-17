import React, { Component } from 'react';

class Overview extends Component {
    render() {
        return <div>
            <p>A trivia game where you use your phone to text in your answers.</p>
            <p>Press the button below then send in your player name.</p>
            <button onClick={() => {
						//this.props.removePost(this.props.index)
					}}> START </button>
        </div>
    }
}

export default Overview