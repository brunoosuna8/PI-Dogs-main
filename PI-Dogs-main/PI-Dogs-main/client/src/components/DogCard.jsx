import * as actions from '../actions/actions.js';
import {Link} from 'react-router-dom';



const DogCard =  (props) =>{
    
    
    return(
        <div className='card'>
            <h3>{props.name}</h3>
            <img src= {props.image} alt="dog-img" />
            <h4>{props.weight}</h4>
            


        </div>
    )
}

export default DogCard;