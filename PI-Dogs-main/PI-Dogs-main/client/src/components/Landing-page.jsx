import React from 'react';
import {NavLink} from 'react-router-dom';
import style from '../styles/Landing-Page.module.css'
export default class LandingPage extends React.Component{
    

    render(){
    return(
        <React.Fragment>
        
      
        <div className={style.App}>
      <h1>Henry Dogs</h1>
      <button className={style.entryButton}><NavLink to={"/dogs"}>ingresar</NavLink></button>
        </div>
    </React.Fragment>
    )
    }
}