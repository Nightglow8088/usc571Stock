import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './navBar.css'

export default function NavBar() {
    return (
        <div class="navBar">
            <ul class="nav nav-pills">
            <li class="nav-item">
                <a class="nav-link" aria-current="page" href="#">Search</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">WatchList</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Portfolio</a>
            </li>
            {/* <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true">Disabled</a>
            </li> */}
            </ul>
        </div>
   )
}
