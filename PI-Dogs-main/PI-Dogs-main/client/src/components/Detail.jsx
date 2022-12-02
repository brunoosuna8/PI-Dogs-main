import React, { useEffect } from 'react';
import * as actions from "../actions/actions";
import {useDispatch,useSelector} from 'react-redux';
import detail from '../styles/Detail.module.css'
//componente cuando se hace click en un perro o se busca por id
export default function Detail(props){
    

    const dispatch = useDispatch();
    const dog = useSelector(state => state.dogDetail);
    const dogId = props.match.params.id;
    React.useEffect(()=>{
         dispatch(actions.getDogById(dogId));
         
    },[])
    
    return(
        <div className={detail.mainContainerDetail}>
            
            <h1>{dog.name}</h1>
            <img src={dog.image && dog.image} ></img>
            <h3>Temperaments : {dog.temperament}</h3>
            <h3>Height : {dog.height}</h3>
            <h3>Life span : {dog.life_span}</h3>
        </div>
    )
}