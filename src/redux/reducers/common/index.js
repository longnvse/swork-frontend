import {commonTypes} from "../../actions/common/types";

const initialState = {
    reload: false,
    isCloseDrawer: false,
    loading: true,
    loadingKey: "",
    title: "",
    avatar: undefined
};

const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case commonTypes.RELOAD_REQUEST:
            return {
                ...state,
                reload: action.reload
            };
        case commonTypes.CLOSE_REQUEST:
            return {
                ...state,
                isCloseDrawer: action.isClose
            }
        case commonTypes.LOADING_START:
            return {
                ...state,
                loadingKey: action.loadingKey,
                loading: true
            }
        case commonTypes.LOADING_FINISH:
            if (action.loadingKey === state.loadingKey) {
                return {
                    ...state,
                    loading: false
                }
            }
            return {
                ...state
            }
        case commonTypes.SET_HEADER:
            return {
                ...state,
                title: action.title
            }
        case commonTypes.CHANGE_AVATAR:
            return {
                ...state,
                avatar: action.avatar
            }
        default:
            return state;
    }
};

export default commonReducer;
