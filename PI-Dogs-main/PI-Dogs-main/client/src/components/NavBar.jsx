import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from '../styles/NavBar.module.css'
export default function NavBar(){
    let url
    React.useEffect(() => {
    
         url = window.location.href;
         url.toString()
         console.log(typeof url)
        
       }, []);
    return(
        <React.Fragment>
            <nav>
            <ul className={styles.navbar}>
                <li className={(url === 'http://localhost:3000/dogs') && styles.selected  }><NavLink exact to={"/dogs"}>Home</NavLink></li>
                <li><NavLink exact to={"/dogs/create-breed"}>Create Breed</NavLink></li>
                <li>About</li>
            </ul>
            </nav>
            
        
        </React.Fragment>
    )
}