import {GET_ALL_DOGS,GET_DOG_BY_ID,CREATE_DOG,GET_DOG_BY_NAME,GET_TEMPERAMENTS} from '../actions/actions'
const initialState ={
    dogs:[],
    dogDetail:{},
    temperaments:[]
}
export default function rootReducer(state = initialState,action){
switch(action.type){
    case GET_ALL_DOGS:
        return {...state,dogs:action.payload}
        case GET_DOG_BY_ID:
            return {...state,dogDetail:action.payload}
        case CREATE_DOG:
            return 'dog created'// ?
            case GET_DOG_BY_NAME:
                return {...state,dogs:action.payload}
        case GET_TEMPERAMENTS:
            return {...state,temperaments:action.payload}
        default: return state;
}
}