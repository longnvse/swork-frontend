import axios from "axios";
import {BASE_PATH} from "./config/Url";


export const SWAxios = axios.create({
    baseURL: `${BASE_PATH}`,
    headers: {
        "Content-Type": "application/json"
    },
});


export const getLocalOauth2Token = () => {
    const oauth2TokenObject = JSON.parse(localStorage.getItem("oauth2Token"));
    const accessToken = oauth2TokenObject?.access_token;
    const tokenType = oauth2TokenObject?.token_type;
    return `${tokenType} ${accessToken}`;
}

export const getLocalAccessToken = () => {
    return localStorage.getItem("accessToken");
}

export const updateLocalAccessToken = (accessToken) => {
    localStorage.setItem("accessToken", accessToken);
}

export const updateLocalOauth2Token = (oauth2Token) => {
    localStorage.setItem("oauth2Token", JSON.stringify(oauth2Token));
}

