import {SWAxios} from "../../system/axios";

const url = "swork/phase-rest/v1.0/phases";

export const getPhasePages = (projectId, params) => {
    return SWAxios.get(`${url}/list/${projectId}`, {params});
}

export const getPhase = (phaseId) => {
    return SWAxios.get(`${url}/${phaseId}`);
}

export const addPhase = ( values) => {
    return SWAxios.post(url, values);
}

export const updatePhase = (phaseId, values) => {
    return SWAxios.put(`${url}/${phaseId}`, values);
}

export const deletePhase = (phaseId) => {
    return SWAxios.delete(`${url}/${phaseId}`);
}
export const approvalPhase = (phaseId, status) => {
    return SWAxios.put(`${url}/approval/${phaseId}`, {}, {params: {status}});
}