import { combineReducers } from "redux";
import app from "./app";
import pets from "./pets";
import vaccinations from "./vaccinations";
import procedures from "./procedures";
import grooming from "./grooming";
import reminders from "./reminders";
import timeline from "./timeline";

export default combineReducers({
  app,
  pets,
  vaccinations,
  procedures,
  grooming,
  reminders,
  timeline,
});
