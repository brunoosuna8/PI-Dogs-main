import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from '../styles/NavBar.module.css'
export default function NavBar(){
    return(
        <React.Fragment>
            <nav>
            <ul className={styles.navbar}>
                <li><NavLink exact to={"/dogs"}>Home</NavLink></li>
                <li><NavLink exact to={"/dogs/create-breed"}>Create Breed</NavLink></li>
                <li>About</li>
            </ul>
            </nav>
            
        
        </React.Fragment>
    )
}