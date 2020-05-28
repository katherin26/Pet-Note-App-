import {
  LOAD_REMINDERS,
  ADDED_REMINDER,
  UPDATED_REMINDER,
  DELETED_REMINDER,
  SELECT_REMINDER,
  SELECT_PET,
} from "../actions";

const initialState = {
  reminders: JSON.parse(localStorage.getItem("reminders")) || [],
  next: null,
  selectedReminder: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REMINDERS:
      localStorage.setItem(
        "reminders",
        JSON.stringify(state.reminders.concat(action.reminders))
      );
      return {
        reminders: state.reminders.concat(action.reminders),
        next: action.next,
        selectedReminder: null,
      };
    case SELECT_PET:
    case ADDED_REMINDER:
    case UPDATED_REMINDER:
    case DELETED_REMINDER:
      localStorage.removeItem("reminders");
      return {
        reminders: [],
        next: null,
        selectedReminder: null,
      };
    case SELECT_REMINDER:
      return {
        ...state,
        selectedReminder: action.reminder,
      };
    default:
      return state;
  }
}

export default reducer;
