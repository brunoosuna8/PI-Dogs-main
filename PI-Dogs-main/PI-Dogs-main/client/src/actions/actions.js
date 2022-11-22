export const GET_ALL_DOGS = "GET_ALL_POSTS";
export const GET_DOG_BY_ID = "GET_DOG_BY_ID";
export const CREATE_DOG = "CREATE_DOG";
export const GET_DOG_BY_NAME = "GET_DOG_BY_NAME";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";
export const FILTER_BY_TEMPERS = "FILTER_BY_TEMPERS";
export const GET_ORDERED = "GET_ORDERED";

export function getAllDogs(name) {
  if (name !== "") {
    return function (dispatch) {
      fetch(`http://localhost:3001/dogs?name=${name}`)
        .then((response) => response.json())

        .then((json) => dispatch({ type: GET_ALL_DOGS, payload: json }));
    };
  } else {
    return function (dispatch) {
      fetch("http://localhost:3001/dogs")
        .then((response) => response.json())

        .then((json) => dispatch({ type: GET_ALL_DOGS, payload: json }));
    };
  }
}

export function getDogById(id) {
  return function (dispatch) {
    fetch(`http://localhost:3001/dogs/${id}`)
      .then((response) => response.json())
      .then((json) => dispatch({ type: GET_DOG_BY_ID, payload: json }));
  };
}

export function createDog(data) {
  return (dispatch) => {
    fetch("http://localhost:3001/dogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        dispatch({ type: CREATE_DOG, payload: data });
      });
  };
}

export function getTemperaments() {
  return function (dispatch) {
    fetch("http://localhost:3001/temperaments")
      .then((response) => response.json())
      .then((json) => dispatch({ type: GET_TEMPERAMENTS, payload: json }));
  };
}

export function filterByTempers(tempers) {
  return function (dispatch) {
    dispatch({ type: FILTER_BY_TEMPERS, payload: tempers });
  };
}

export function getOrdered(state) {
    return function (dispatch) {
      dispatch({ type: GET_ORDERED, payload: state });
    };
  }