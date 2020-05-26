import {
  LOAD_PROCEDURES,
  ADDED_PROCEDURE,
  UPDATED_PROCEDURE,
  DELETED_PROCEDURE,
  SELECT_PROCEDURE,
  SELECT_PET,
} from "../actions";

const initialState = {
  procedures: JSON.parse(localStorage.getItem("procedures")) || [],
  next: null,
  selectedProcedure: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PROCEDURES:
      localStorage.setItem(
        "procedures",
        state.procedures.concat(action.procedures)
      );
      return {
        procedures: state.procedures.concat(action.procedures),
        next: action.next,
        selectedProcedure: null,
      };
    case SELECT_PET:
    case ADDED_PROCEDURE:
    case UPDATED_PROCEDURE:
    case DELETED_PROCEDURE:
      localStorage.removeItem("procedures");
      return {
        procedures: [],
        next: null,
        selectedProcedure: null,
      };
    case SELECT_PROCEDURE:
      return {
        ...state,
        selectedProcedure: action.procedure,
      };
    default:
      return state;
  }
}

export default reducer;
