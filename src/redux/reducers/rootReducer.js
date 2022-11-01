import {combineReducers} from "redux";
import loginReducer from "./login/login";

const rootReducer = combineReducers({
    loginReducer
});

export default rootReducer;
