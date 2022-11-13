import React from 'react';
import {NavLink} from 'react-router-dom';

export default class LandingPage extends React.Component{
    
    // si quiero que este comp tenga local state
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         name:'bruno'
    //     }
    // }

    render(){
    return(
        <React.Fragment>
        

        <div className="App">
      <h1>Henry Dogs</h1>
      <button><NavLink to={"/home"}>ingresar</NavLink></button>
        </div>
    </React.Fragment>
    )
    }
}