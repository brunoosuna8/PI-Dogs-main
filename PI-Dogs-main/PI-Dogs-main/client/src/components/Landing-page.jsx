import React from 'react';
import {NavLink} from 'react-router-dom';

export default class LandingPage extends React.Component{
    

    render(){
    return(
        <React.Fragment>
        

        <div className="App">
      <h1>Henry Dogs</h1>
      <button><NavLink to={"/dogs"}>ingresar</NavLink></button>
        </div>
    </React.Fragment>
    )
    }
}