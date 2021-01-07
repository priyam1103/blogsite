import { combineReducers,createStore } from "redux"
import reducerState from "./reducer";
const reducer = combineReducers({ reducerState });

const store = createStore(reducer);
export default store;
