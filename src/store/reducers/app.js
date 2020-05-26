import {
  LOGIN,
  LOGOUT,
  REQUEST_SENT,
  REQUEST_FINISHED,
  NOTIFY_USER,
  CLEAR_NOTIFICATION,
} from "../actions";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  loading: false,
  notification: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("user", JSON.stringify(action.user));
      return {
        ...state,
        user: action.user,
      };
    case LOGOUT:
      localStorage.removeItem("user");
      return {
        ...state,
        user: null,
      };
    case REQUEST_SENT:
      return {
        ...state,
        loading: true,
      };
    case REQUEST_FINISHED:
      return {
        ...state,
        loading: false,
      };
    case NOTIFY_USER:
      return {
        ...state,
        notification: action.notification,
      };
    case CLEAR_NOTIFICATION:
      return {
        ...state,
        notification: null,
      };
    default:
      return state;
  }
}

export default reducer;
