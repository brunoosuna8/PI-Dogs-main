import React, { useEffect } from 'react';
import * as actions from "../actions/actions";
import {useDispatch,useSelector} from 'react-redux';
//componente cuando se hace click en un perro o se busca por id
export default function Detail(props){
    

    const dispatch = useDispatch();
    const dog = useSelector(state => state.dogDetail);
    const dogId = props.match.params.id;
    React.useEffect(()=>{
        dispatch(actions.getDogById(dogId));
    }
    )
    return(
        <div>
            <h1>{dog.name}</h1>
            <img src={dog.image.url} style="width: 50px;height: 50px"></img>
            <h3>Temperaments : {dog.temeperament}</h3>
            <h3>Height : {dog.height}</h3>
            <h3>Weight : {dog.weight}</h3>
            <h3>Life span : {dog.life_span}</h3>


        </div>
    )
}