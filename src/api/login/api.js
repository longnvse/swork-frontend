import {SWAxios} from "../../system/axios";
import {CLIENT_ID, CLIENT_SECRET} from "../../system/axios/config/Url";

const BASE_URL_LOGIN = `/login-rest/v1.0/signin`;
const BASE_URL_TOKEN = `/oauth2/token`;
const BASE_URL_REFRESH_TOKEN = `/login-rest/v1.0/refreshtoken`;
const BASE_URL_LOG_OUT = `/login-rest/v1.0/logout`;

export const signIn = ({username, password, rememberMe}) => {
    return SWAxios.post(
        BASE_URL_LOGIN,
        {
            username,
            password,
            rememberMe
        },
        {
            withCredentials: true,
        }
    );
};

export const getToken = () => {
    return SWAxios.post(
        BASE_URL_TOKEN,
        {},
        {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            params: {
                'grant_type': 'client_credentials',
                'client_id': CLIENT_ID,
                'client_secret': CLIENT_SECRET
            }
        }
    );
};

export const refreshToken = (refreshtoken) => {
    return SWAxios.post(
        BASE_URL_REFRESH_TOKEN,
        {
            refreshTokenCode: refreshtoken,
        },
        {
            withCredentials: true
        }
    );
};

export const logout = () => {
    return SWAxios.post(
        BASE_URL_LOG_OUT,
        {},
        {
            withCredentials: true
        }
    );
}
