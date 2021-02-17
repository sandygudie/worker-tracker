import React, { Component } from 'react'
import {Link} from "react-router-dom"


export default class Navbar extends Component {
    render() {
        return (
            <nav className ="navbar navbar-dark bg-dark">
                <Link to ="/" className ="navbar-brand"> Work Tracker </Link>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample01" aria-controls="navbarsExample01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
            <div className ="collapse navbar-collapse"  id="navbarsExample01">
                <ul className ="navbar-nav mr-auto">
                    <li className ="nav-item">
                        <Link to = "/" className = "nav-link">Workers</Link>
                    </li>
                    <li className ="nav-item">
                        <Link to = "/create" className = "nav-link"> Create Worker Log</Link>
                    </li>
                    <li className ="nav-item mr-2">
                        <Link to = "/user" className = "nav-link">Add Worker</Link>
                    </li>
                </ul>
            </div>
            
            </nav>


            
        )
    }
}
