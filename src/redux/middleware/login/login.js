import {call, fork, put, takeEvery} from "@redux-saga/core/effects";
import {getToken, logout, signIn} from "../../../api/login/api";
import {getTokenSuccess, loginError, loginSuccess} from "../../actions/login/actions";
import {loginTypes} from "../../actions/login/types";
import {message} from "antd";

function* onLoginStartAsync(action) {
    try {
        const {username, password, rememberMe} = action;

        const responseOauth2 = yield call(getToken);

        if (responseOauth2.status === 200) {
            yield put(getTokenSuccess(responseOauth2.data));
            localStorage.setItem("oauth2Token", JSON.stringify(responseOauth2.data));
        }

        const response = yield call(
            signIn,
            {
                username,
                password,
                rememberMe
            }
        )
        if (response.status === 200) {
            localStorage.setItem("accessToken", response.data.accessToken);

            yield put(loginSuccess());
        }
    } catch (error) {
        yield put(loginError(error?.response?.data));
        message.error("Sai tên người dùng hoặc mật khẩu. Vui lòng thử lại!");
    }
}

function* onLogin() {
    yield takeEvery(loginTypes.REQUEST, onLoginStartAsync);
}

function* onLogoutStartAsync() {
    try {
        yield call(logout);
    } finally {
        window.localStorage.clear();
        window.location.href = "/login";
    }
}

function* onLogout() {
    yield takeEvery(
        loginTypes.LOGOUT,
        onLogoutStartAsync
    );
}

const login = [fork(onLogin), fork(onLogout)];

export default login;
