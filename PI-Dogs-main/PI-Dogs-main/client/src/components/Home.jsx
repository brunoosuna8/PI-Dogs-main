import React from 'react';
import NavBar from './NavBar'
import {getAllDogs} from '../actions/actions'
import { connect } from "react-redux";
import DogCard from './DogCard'


export class Home extends React.Component{
  
    // si quiero que este comp tenga local state
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         name:'bruno'
    //     }
    // }

    //componentdidmount para que se guarden todos lo perros en el state global
    componentDidMount(){
        this.props.getAllDogs();
    }
    render(){
    return(
        <React.Fragment>
            <div className='filter'></div>
        <div className='dogs-container'>

        


        {this.props.dogs && this.props.dogs.map(dog =>{
           
            
        return(<DogCard key={dog.id}
          id={dog.id}
          name={dog.name}
          temperament={dog.temperament}
          weight={dog.weight}
          image = {dog.image}

          />)
            
          
        })}
        </div>
      </React.Fragment>
    );
    
    }
    

}

export function mapStateToProps(state){
    return{dogs:state.dogs}
  }
  
   export const mapDispatchToProps ={getAllDogs}
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home);