import {loginTypes} from "./types";

export const getTokenStart = () => ({
    type: loginTypes.GET_TOKEN_REQUEST,
});

export const updateUsernamePassword = (username, password) => ({
    type: loginTypes.UPDATE_USERNAME_PASSWORD,
    username,
    password
})

export const getTokenSuccess = (oauth2Token) => ({
    type: loginTypes.GET_TOKEN_SUCCESS,
    oauth2Token,
});

export const getTokenError = (error) => ({
    type: loginTypes.GET_TOKEN_ERROR,
    error: error,
});

export const loginStart = ({username, password, rememberMe}) => ({
    type: loginTypes.REQUEST,
    username,
    password,
    rememberMe,
    loggedInSuccess: false
});

export const loginSuccess = () => ({
    type: loginTypes.SUCCESS,
    loggedInSuccess: true
});

export const loginError = (error) => ({
    type: loginTypes.FAILURE,
    error: error,
    loginSuccess: false,
});


export const logoutStart = () => ({
    type: loginTypes.LOGOUT,
});
