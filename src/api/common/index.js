import {logoutStart} from "../../redux/actions/login/actions";
import {store} from "../../redux/store/store";
import jwtDecode from "jwt-decode";

export const getMe = () => {
    try {
        const accessToken = localStorage.getItem("accessToken");
        return jwtDecode(accessToken);
    } catch (e) {
        store.dispatch(logoutStart())
    }
}