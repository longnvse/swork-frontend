import {
    getLocalAccessToken,
    getLocalOauth2Token,
    SWAxios as axiosInstance,
    updateLocalAccessToken,
    updateLocalOauth2Token
} from "../index";
import {getToken, refreshToken} from "../../../api/login/api";
import {logoutStart} from "../../../redux/actions/login/actions";

const setup = (store) => {


    axiosInstance.interceptors.request.use(
        (config) => {
            const oauth2Token = getLocalOauth2Token();
            const accessToken = getLocalAccessToken();

            config.headers["Authorization"] = oauth2Token;
            config.headers["swork-x-user-context-request"] = accessToken;

            return config;

        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            console.log(err);

            const originalConfig = err.config;

            const response = err.response;

            const status = response?.status


            if (!originalConfig?.url?.includes("/login-rest/v1.0/signin")) {
                // Access Token was expired
                if (status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;
                    try {
                        const rs = await refreshToken();
                        const {accessToken} = rs.data;
                        updateLocalAccessToken(accessToken);
                        return axiosInstance(originalConfig);
                    } catch (_error) {
                        debugger
                        if (_error.config.url === `/login-rest/v1.0/refreshtoken` && _error.response.status === 400) {
                            store.dispatch(logoutStart());
                        }
                        return Promise.reject(_error);
                    }
                }
            }

            if (status === 403 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    const rs = await getToken();
                    updateLocalOauth2Token(rs.data);
                    return axiosInstance(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }

            return Promise.reject(err);
        }
    );
};

export default setup;