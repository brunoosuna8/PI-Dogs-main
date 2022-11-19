import React from 'react';
import {NavLink} from 'react-router-dom';

export default function NavBar(){
    return(
        <React.Fragment>
        <nav>
            <ul>
                <li><NavLink exact to={"/dogs"}>home</NavLink></li>
                <li><NavLink exact to={"/dogs/create-breed"}>Create Breed</NavLink></li>
                <li>about</li>
            </ul>
        </nav>
        </React.Fragment>
    )
}