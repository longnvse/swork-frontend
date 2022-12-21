import { SWAxios } from "../../system/axios";

const url = "swork/account-rest/v1.0/accounts";
const urlInfo = "swork/account-rest/v1.0/accounts/account-info";

export const getAccountPages = (params) => {
    return SWAxios.get(url, { params });
};

export const getAccount = (accountId) => {
    return SWAxios.get(`${url}/${accountId}`);
};

export const addAccount = (values) => {
    return SWAxios.post(url, values);
};

export const updateAccount = (accountId, values) => {
    return SWAxios.put(`${url}/${accountId}`, values);
};

export const approvalAccount = (accountId, status) => {
    return SWAxios.put(
        `${url}/approval/${accountId}`,
        {},
        { params: { status } },
    );
};

export const deleteAccount = (accountId) => {
    return SWAxios.delete(`${url}/${accountId}`);
};

export const getAccountInfo = () => {
    return SWAxios.get(`${urlInfo}`);
};

export const updateAccountInfo = (values) => {
    return SWAxios.put(`${urlInfo}`, values);
};

export const patchAccountInfo = (values) => {
    return SWAxios.patch(`${urlInfo}`, values);
};
