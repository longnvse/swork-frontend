import {combineReducers} from "redux";
import loginReducer from "./login/login";
import commonReducer from "./common";

const rootReducer = combineReducers({
    loginReducer,
    commonReducer
});

export default rootReducer;
