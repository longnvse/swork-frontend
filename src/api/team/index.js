import {SWAxios} from "../../system/axios";

const url = "swork/resource-rest/v1.0/teams";

export const getTeamPages = ({projectId, phaseId, params}) => {
    return SWAxios.get(url, {params: {...params, projectId, phaseId}});
}

export const getTeam = (teamId) => {
    return SWAxios.get(`${url}/${teamId}`);
}

export const addTeam = (values) => {
    return SWAxios.post(url, values);
}

export const updateTeam = (teamId, values) => {
    return SWAxios.put(`${url}/${teamId}`, values);
}

export const deleteTeam = (teamId) => {
    return SWAxios.delete(`${url}/${teamId}`);
}
export const approvalTeam = (teamId, status) => {
    return SWAxios.put(`${url}/approval/${teamId}`, {}, {params: {status}});
}