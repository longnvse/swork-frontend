import {
    getLocalAccessToken,
    getLocalOauth2Token,
    SWAxios as axiosInstance,
    updateLocalAccessToken,
    updateLocalOauth2Token
} from "../index";
import {getToken, refreshToken} from "../../../api/login/api";
import {logoutStart} from "../../../redux/actions/login/actions";
import {closeDrawer, isReload, loadingFinish, loadingStart} from "../../../redux/actions/common/actions";
import {urlFile} from "../../../api/file";
import dayjs from "dayjs";
import qs from "qs";

const setup = (store) => {

    axiosInstance.interceptors.request.use(
        (config) => {
            const oauth2Token = getLocalOauth2Token();
            const accessToken = getLocalAccessToken();

            config.headers["Authorization"] = oauth2Token;
            config.headers["swork-x-user-context-request"] = accessToken;

            if (config.url !== urlFile) {
                store.dispatch(loadingStart(config.url));
            }

            config.paramsSerializer = (params) => qs.stringify(params, {
                serializeDate: (date) => dayjs(date).format("YYYY-MM-DD HH:mm:ss")
            });

            return config;

        },
        (error) => {
            store.dispatch(loadingFinish(error.config.url));

            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (res) => {
            store.dispatch(loadingFinish(res.config.url));
            if (res.config.method === "get") {
                store.dispatch(isReload(false));
            }

            switch (res.config.method) {
                case "put":
                case "post":
                case "patch":
                case "delete": {
                    store.dispatch(isReload(true));
                    store.dispatch(closeDrawer(new Boolean(true)));
                }
            }
            return res;
        },
        async (err) => {
            store.dispatch(loadingFinish(err.config.url));

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
                        store.dispatch(logoutStart());
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

            store.dispatch(closeDrawer(false));

            return Promise.reject(err);
        }
    );
};

export default setup;