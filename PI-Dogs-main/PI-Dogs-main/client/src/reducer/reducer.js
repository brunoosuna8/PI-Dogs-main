import {
  GET_ALL_DOGS,
  GET_DOG_BY_ID,
  CREATE_DOG,
  GET_DOG_BY_NAME,
  GET_TEMPERAMENTS,
  FILTER_BY_TEMPERS,
  GET_ORDERED,
} from "../actions/actions";
const initialState = {
  dogs: [],
  dogDetail: {},
  temperaments: [],
  backUp: [],
};
export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_DOGS:
      return { ...state, dogs: action.payload, backUp: action.payload };
    case GET_DOG_BY_ID:
      return { ...state, dogDetail: action.payload };
    case CREATE_DOG:
      return "dog created";
    case GET_DOG_BY_NAME:
      return { ...state, dogs: action.payload };
    case GET_TEMPERAMENTS:
      return { ...state, temperaments: action.payload };

    case FILTER_BY_TEMPERS:
      let filteredDogs = [...state.backUp];

      for (let i = 0; i < action.payload.length; i++) {
        filteredDogs = filteredDogs.filter((e) =>
          e.temperament?.includes(action.payload[i])
        );
      }
      console.log(filteredDogs);
      return { ...state, dogs: filteredDogs };

    case GET_ORDERED:
      let ordered = state.dogs.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      });
      if (action.payload.state === "ascendente") {
        return { ...state, dogs: ordered };
      } else if (action.payload.state === "descendente") {
        let reversed = ordered.reverse();
        return { ...state, dogs: reversed };
      }else{break;}
    default:
      return state;
  }
}
