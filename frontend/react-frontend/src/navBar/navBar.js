import React from 'react'
import { NavLink } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './navBar.css'

export default function NavBar({currentSearchTicker}) {

    return (
        <div className="navBar">
            <p className="nav-name">Stock Search</p>

            <ul className="nav nav-pills">
                <li id="search" className="nav-item">

                    <NavLink className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"} 
                        to={`/search/${currentSearchTicker=="" ? "home": currentSearchTicker}`}
                    >
                        Search
                    </NavLink>
                </li>


                <li id="watchList" className="nav-item">
                    <NavLink
                        className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"}
                        to="/watchList"
                    >
                        WatchList
                    </NavLink>
                </li>


                <li id ="portfolio" className="nav-item">
                    <NavLink
                        className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"}
                        to="/portfolio"
                    >
                        Portfolio
                    </NavLink>
                </li>

            </ul>
        </div>
   )
}
