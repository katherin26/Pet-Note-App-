import {
  LOAD_GROOMING,
  ADDED_GROOMING,
  UPDATED_GROOMING,
  DELETED_GROOMING,
  SELECT_GROOMING,
  SELECT_PET,
} from "../actions";

const initialState = {
  grooming: JSON.parse(localStorage.getItem("grooming")) || [],
  next: null,
  selectedGrooming: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_GROOMING:
      localStorage.setItem(
        "grooming",
        JSON.stringify(state.grooming.concat(action.grooming))
      );
      return {
        grooming: state.grooming.concat(action.grooming),
        next: action.next,
        selectedGrooming: null,
      };
    case SELECT_PET:
    case ADDED_GROOMING:
    case UPDATED_GROOMING:
    case DELETED_GROOMING:
      localStorage.removeItem("grooming");
      return {
        grooming: [],
        next: null,
        selectedGrooming: null,
      };
    case SELECT_GROOMING:
      return {
        ...state,
        selectedGrooming: action.grooming,
      };
    default:
      return state;
  }
}

export default reducer;
