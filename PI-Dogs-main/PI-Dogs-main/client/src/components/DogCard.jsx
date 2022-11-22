import * as actions from '../actions/actions.js';
import {NavLink} from 'react-router-dom';
import card from '../styles/DogCard.module.css'


const DogCard =  (props) =>{
    
   
    return(
        
    <div  className={card.card}><NavLink exact to={"/dogs/"+props.id}>
            <h3> {props.name}</h3>
            <img src= {props.image}  alt="dog-img" />
            <h4>Weight : {props.weight} Kg</h4>
            <h4>Temperaments : {props.temperament}</h4>

            


            </NavLink></div>
    )
}

export default DogCard;