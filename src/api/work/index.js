import {SWAxios} from "../../system/axios";

const url = "swork/work-rest/v1.0/works";

export const getWorkPages = (params) => {
    return SWAxios.get(url, {params: {page: 1, pageSize: 1000, ...params}});
};

export const getWork = (workId) => {
    return SWAxios.get(`${url}/${workId}`);
};

export const addWork = (values) => {
    return SWAxios.post(url, values);
};

export const updateWork = (workId, values) => {
    return SWAxios.put(`${url}/${workId}`, values);
};

export const deleteWork = (workId) => {
    return SWAxios.delete(`${url}/${workId}`);
};

export const approvalWork = (workId, status) => {
    return SWAxios.put(`${url}/approval/${workId}`, {}, {params: {status}});
}

export const reportProgressByAmount = (workId, completeAmount) => {
    return SWAxios.put(`${url}/report-process/by-amount/${workId}`, {}, {params: {completeAmount}});
}
