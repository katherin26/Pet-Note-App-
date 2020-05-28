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
      localStorage.setItem(
        "pets",
        JSON.stringify(state.pets.concat(action.pets))
      );
      return {
        pets: state.pets.concat(action.pets),
        next: action.next,
        selectedPet: null,
      };
    case UPDATED_PET:
      const petIndex = state.pets.findIndex(
        (pet) => pet.record === action.pet.record
      );
      if (petIndex === -1) return state;

      const newPets = [...state.pets];
      newPets.splice(petIndex, 1, action.pet);
      localStorage.setItem("pets", JSON.stringify(newPets));
      return {
        ...state,
        pets: newPets,
        selectedPet: action.pet,
      };
    case ADDED_PET:
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
