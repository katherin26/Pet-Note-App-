import { Auth } from "aws-amplify";
import store from "../store/index";
import {
  LOGIN,
  LOGOUT,
  REQUEST_SENT,
  REQUEST_FINISHED,
  NOTIFY_USER,
} from "../store/actions";

export async function logIn(email, password) {
  return Auth.signIn({ username: email, password });
}

export async function logOut() {
  try {
    store.dispatch({ type: REQUEST_SENT });
    await Auth.signOut();
    store.dispatch({ type: LOGOUT });
  } catch (e) {
    store.dispatch({
      type: NOTIFY_USER,
      notification: { type: "error", message: e.message },
    });
  } finally {
    store.dispatch({ type: REQUEST_FINISHED });
  }
}

export async function createAccount(
  email,
  password,
  firstName,
  lastName,
  picture
) {
  return Auth.signUp({
    username: email,
    password,
    attributes: {
      given_name: firstName,
      family_name: lastName,
      name: `${firstName} ${lastName}`,
      picture,
    },
  });
}

export async function confirmAccount(email, code) {
  try {
    console.log("Confirming ", email, code);
    store.dispatch({ type: REQUEST_SENT });
    await Auth.confirmSignUp(email, code);
    return true;
  } catch (e) {
    store.dispatch({
      type: NOTIFY_USER,
      notification: { type: "error", message: e.message },
    });
    return false;
  } finally {
    store.dispatch({ type: REQUEST_FINISHED });
  }
}

export async function resendVerificationCode(email) {
  return Auth.resendSignUp(email);
}

export async function requestPasswordReset(email) {
  return Auth.forgotPassword(email);
}

export async function resetPassword(email, code, password) {
  return Auth.forgotPasswordSubmit(email, code, password);
}

export async function updateInformation(firstName, lastName, picture) {
  try {
    const user = await Auth.currentAuthenticatedUser();
    store.dispatch({ type: REQUEST_SENT });
    await Auth.updateUserAttributes(user, {
      given_name: firstName,
      family_name: lastName,
      name: `${firstName} ${lastName}`,
      picture,
    });
    const updatedUser = await Auth.currentAuthenticatedUser();
    store.dispatch({ type: LOGIN, user: updatedUser });
    return true;
  } catch (e) {
    store.dispatch({
      type: NOTIFY_USER,
      notification: { type: "error", message: e.message },
    });
    return false;
  } finally {
    store.dispatch({ type: REQUEST_FINISHED });
  }
}

export async function changePassword(oldPassword, newPassword) {
  try {
    const user = await Auth.currentAuthenticatedUser();
    store.dispatch({ type: REQUEST_SENT });
    await Auth.changePassword(user, oldPassword, newPassword);
    return true;
  } catch (e) {
    store.dispatch({
      type: NOTIFY_USER,
      notification: { type: "error", message: e.message },
    });
    return false;
  } finally {
    store.dispatch({ type: REQUEST_FINISHED });
  }
}
