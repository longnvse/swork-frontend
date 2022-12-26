import {SWAxios} from "../../system/axios";

const url = "swork/project-rest/v1.0/projects";
const urlChart = "swork/project-rest/v1.0/charts";

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

export const updateDateProject = (projectId, startDate, endDate) => {
    return SWAxios.put(`${url}/date/${projectId}`, {}, {params: {startDate, endDate}});
}

export const updateMemberProject = (projectId, values) => {
    return SWAxios.put(`${url}/member/${projectId}`, values);
}

export const getGanttChartDataProject = (projectId) => {
    return SWAxios.get(`${url}/gantt-chart/${projectId}`);
}

export async function getDashboardProgressPhase(projectId) {
    return SWAxios.get(`${url}`);
}

export async function getDashboardStatusWork(projectId) {
    return SWAxios.get(`${urlChart}/dashboard-status-work`, {params: {projectId}});
}