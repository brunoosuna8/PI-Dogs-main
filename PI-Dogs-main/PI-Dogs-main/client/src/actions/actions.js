export const GET_ALL_DOGS = 'GET_ALL_POSTS';
export const GET_DOG_BY_ID = 'GET_DOG_BY_ID';


export function getAllDogs(){
    return  function (dispatch){
        fetch('http://localhost:3001/dogs')
        .then(response =>response.json())
        .then(json => dispatch({type:GET_ALL_DOGS,payload:json}))
    }
}

export function getDogById(id){
    return  function (dispatch){
        fetch(`http://localhost:3001/dogs/${id}`)
        .then(response =>response.json())
        .then(json => dispatch({type:GET_DOG_BY_ID,payload:json}))
    }
}