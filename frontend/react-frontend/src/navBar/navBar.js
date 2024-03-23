import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './navBar.css'

export default function NavBar() {
    return (
        <div className="navBar">
            <ul className="nav nav-pills">
            <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#">Search</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">WatchList</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Portfolio</a>
            </li>

            </ul>
        </div>
   )
}
