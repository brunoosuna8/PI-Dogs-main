import React from 'react';
import {NavLink} from 'react-router-dom';

export default function NavBar(){
    return(
        <React.Fragment>
        <nav>
            <ul>
                <li><NavLink to={"/home"}>home</NavLink></li>
                <li><NavLink to={"/create-breed"}>Create Breed</NavLink></li>
                <li>about</li>
            </ul>
        </nav>
        </React.Fragment>
    )
}