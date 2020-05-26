import {
  LOAD_PETS,
  ADDED_PET,
  UPDATED_PET,
  DELETED_PET,
  SELECT_PET,
} from "../actions";

const initialState = {
  pets: JSON.parse(localStorage.getItem("pets")) || [],
  next: null,
  selectedPet: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PETS:
      localStorage.setItem("pets", state.pets.concat(action.pets));
      return {
        pets: state.pets.concat(action.pets),
        next: action.next,
        selectedPet: null,
      };
    case ADDED_PET:
    case UPDATED_PET:
    case DELETED_PET:
      localStorage.removeItem("pets");
      return {
        ...state,
        pets: [],
        next: null,
      };
    case SELECT_PET:
      return {
        ...state,
        selectedPet: action.pet,
      };
    default:
      return state;
  }
}

export default reducer;
