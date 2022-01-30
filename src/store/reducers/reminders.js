import {
  LOAD_REMINDERS,
  ADDED_REMINDER,
  UPDATED_REMINDER,
  DELETED_REMINDER,
  SELECT_REMINDER,
  SELECT_PET,
  LOAD_MORE_REMINDER,
} from "../actions";

const initialState = {
  reminders: [],
  next: null,
  selectedReminder: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REMINDERS:
      return {
        reminders: action.reminders,
        next: action.next,
        selectedReminder: null,
      };
    case LOAD_MORE_REMINDER: {
      return {
        reminders: state.reminders.concat(action.reminders),
        next: action.next,
      };
    }
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
