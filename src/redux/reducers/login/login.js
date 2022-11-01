import {loginTypes} from "../../actions/login/types";

const initialState = {
    loggedInSuccess: false,
    error: null
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case loginTypes.REQUEST:
            return {
                ...state,
                loggedInSuccess: false
            };
        case loginTypes.SUCCESS:
            return {
                ...state,
                loggedInSuccess: true,
                error: null
            };
        case loginTypes.FAILURE:
        case loginTypes.LOGOUT:
            return {
                ...state,
                error: action.error,
                loggedInSuccess: false
            };
        case loginTypes.GET_TOKEN_REQUEST:
            return {
                ...state,
                getTokenProgress: true,
            };
        case loginTypes.GET_TOKEN_SUCCESS:
            return {
                ...state,
                oauth2Token: action.oauth2Token,
            };
        case loginTypes.GET_TOKEN_ERROR:
            return {
                ...state,
                getTokenError: true,
                "oauth2-token-error": action.error,
            };
        default:
            return state;
    }
};

export default loginReducer;
