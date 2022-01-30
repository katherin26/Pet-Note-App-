import { LOAD_TIMELINE, SELECT_PET, LOAD_MORE_TIMELINE } from "../actions";

const initialState = {
  timeline: [],
  next: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TIMELINE:
      return {
        timeline: action.timeline,
        next: action.next,
      };
    case LOAD_MORE_TIMELINE:
      return {
        timeline: state.timeline.concat(action.timeline),
        next: action.next,
      };
    case SELECT_PET:
      localStorage.removeItem("timeline");
      return {
        timeline: [],
        next: null,
      };
    default:
      return state;
  }
}

export default reducer;
