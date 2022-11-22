import {SWAxios} from "../../system/axios";

const url = "swork/phase-rest/v1.0/phases";

export const getPhasePages = (params) => {
    return SWAxios.get(url, {params});
}

export const getPhase = (projectId) => {
    return SWAxios.get(`${url}/${projectId}`);
}

export const addPhase = (values) => {
    return SWAxios.post(url, values);
}

export const updatePhase = (projectId, values) => {
    return SWAxios.put(`${url}/${projectId}`, values);
}

export const deletePhase = (projectId) => {
    return SWAxios.delete(`${url}/${projectId}`);
}
export const approvalPhase = (projectId, status) => {
    return SWAxios.put(`${url}/approval/${projectId}`, {}, {params: {status}});
}