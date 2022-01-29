import {
  LOAD_VACCINATIONS,
  ADDED_VACCINATION,
  UPDATED_VACCINATION,
  DELETED_VACCINATION,
  SELECT_VACCINATION,
  SELECT_PET,
  LOAD_MORE_VACCINATIONS,
} from "../actions";

const initialState = {
  vaccinations: [],
  next: null,
  selectedVaccination: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_VACCINATIONS:
      return {
        vaccinations: action.vaccinations,
        next: action.next,
        selectedVaccination: null,
      };
    case LOAD_MORE_VACCINATIONS:
      return {
        vaccinations: state.vaccinations.concat(action.vaccinations),
        next: action.next,
        selectedVaccination: null,
      };
    case SELECT_PET:
    case ADDED_VACCINATION:
    case UPDATED_VACCINATION:
    case DELETED_VACCINATION:
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
