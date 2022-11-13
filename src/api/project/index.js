import {SWAxios} from "../../system/axios";

const url = "swork/project-rest/v1.0/projects";

export const getProjectPages = (params) => {
    return SWAxios.get(url, {params});
}

export const getProject = (projectId) => {
    return SWAxios.get(`${url}/${projectId}`);
}

export const addProject = (values) => {
    return SWAxios.post(url, values);
}

export const updateProject = (projectId, values) => {
    return SWAxios.put(`${url}/${projectId}`, values);
}

export const deleteProject = (projectId) => {
    return SWAxios.delete(`${url}/${projectId}`);
}
export const approvalProject = (projectId, status) => {
    return SWAxios.put(`${url}/approval/${projectId}`, {}, {params: {status}});
}