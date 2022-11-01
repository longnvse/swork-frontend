import {commonTypes} from "./types";

export const isReload = (reload) => ({
    type: commonTypes.RELOAD_REQUEST,
    reload
});

export const closeDrawer = (isClose) => ({
    type: commonTypes.CLOSE_REQUEST,
    isClose
});
export const loadingStart = (key) => ({
    type: commonTypes.LOADING_START,
    loadingKey: key
});

export const loadingFinish = (key) => ({
    type: commonTypes.LOADING_FINISH,
    loadingKey: key
});
