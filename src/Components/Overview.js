import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class Overview extends Component {
    render() {
        return <div>
            <p>A trivia game where you use your phone to text in your answers.</p>
            <p>Press the button below then send in your player name.</p>
                    <button>
                    <Link className="startIcon" to="Enter">START</Link>
                    </button>
        </div>
    }
}

export default Overview