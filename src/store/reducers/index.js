import { combineReducers } from "redux";
import weatherReducer from "./weatherReducer";
import appReducer from "./appReducer";

const combinedReducer = combineReducers({
  weatherReducer,
  appReducer,
});

export default combinedReducer;
