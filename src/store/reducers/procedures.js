import {
  LOAD_PROCEDURES,
  ADDED_PROCEDURE,
  UPDATED_PROCEDURE,
  DELETED_PROCEDURE,
  SELECT_PROCEDURE,
  SELECT_PET,
  LOAD_MORE_PROCEDURES,
} from "../actions";

const initialState = {
  procedures: [],
  next: null,
  selectedProcedure: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PROCEDURES:
      return {
        procedures: action.procedures,
        next: action.next,
        selectedProcedure: null,
      };
    case LOAD_MORE_PROCEDURES:
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
