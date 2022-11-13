import React from 'react';
import NavBar from './NavBar'

export default class Home extends React.Component{
    
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
            <NavBar/>
        <div>holaaa home</div>

        </React.Fragment>
    )
    }
}