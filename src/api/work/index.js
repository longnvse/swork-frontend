import {SWAxios} from "../../system/axios";

const url = "swork/work-rest/v1.0/works";

export const getWorkPages = (params) => {
    return SWAxios.get(url, {params});
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

export const updateWorkDate = (workId, startDate, endDate) => {
    console.log("axios:", startDate, endDate);
    return SWAxios.put(`${url}/date/${workId}`, {}, {params: {startDate, endDate}});
}

export const reportProgressByAmount = (workId, completeAmount) => {
    return SWAxios.put(`${url}/report-process/by-amount/${workId}`, {}, {params: {completeAmount}});
}

export const reportProgressManual = (workId, progress) => {
    return SWAxios.put(`${url}/report-process/manual/${workId}`, {}, {params: {progress}});
}