import {
  LOAD_VACCINATIONS,
  ADDED_VACCINATION,
  UPDATED_VACCINATION,
  DELETED_VACCINATION,
  SELECT_VACCINATION,
  SELECT_PET,
} from "../actions";

const initialState = {
  vaccinations: JSON.parse(localStorage.getItem("vaccinations")) || [],
  next: null,
  selectedVaccination: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_VACCINATIONS:
      localStorage.setItem(
        "vaccinations",
        JSON.stringify(state.vaccinations.concat(action.vaccinations))
      );
      return {
        vaccinations: state.vaccinations.concat(action.vaccinations),
        next: action.next,
        selectedVaccination: null,
      };
    case SELECT_PET:
    case ADDED_VACCINATION:
    case UPDATED_VACCINATION:
    case DELETED_VACCINATION:
      localStorage.removeItem("vaccinations");
      return {
        vaccinations: [],
        next: null,
        selectedVaccination: null,
      };
    case SELECT_VACCINATION:
      return {
        ...state,
        selectedVaccination: action.vaccination,
      };
    default:
      return state;
  }
}

export default reducer;
