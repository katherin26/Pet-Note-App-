import { LOAD_TIMELINE, SELECT_PET } from "../actions";

const initialState = {
  timeline: JSON.parse(localStorage.getItem("timeline")) || [],
  next: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TIMELINE:
      localStorage.setItem(
        "timeline",
        JSON.stringify(state.timeline.concat(action.timeline))
      );
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
