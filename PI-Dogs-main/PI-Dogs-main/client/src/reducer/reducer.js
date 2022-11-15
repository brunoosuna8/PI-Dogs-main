import {GET_ALL_DOGS,GET_DOG_BY_ID} from '../actions/actions'
const initialState ={
    dogs:[],
    dogDetail:{}
    // temperaments?
}
export default function rootReducer(state = initialState,action){
switch(action.type){
    case GET_ALL_DOGS:
        return {...state,dogs:action.payload}
        case GET_DOG_BY_ID:
            return {...state,dogDetail:action.payload}


        default: return state;
}
}