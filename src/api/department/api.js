import {SWAxios} from "../../system/axios";

const url = "/swork/department-rest/v1.0/departments";

export const getDepartmentPages = (params) => {
    return SWAxios.get(url, {params});
}

export const getDepartment = (departmentId) => {
    return SWAxios.get(`${url}/${departmentId}`);
}

export const addDepartment = (values) => {
    return SWAxios.post(url, values);
}

export const updateDepartment = (departmentId, values) => {
    return SWAxios.put(`${url}/${departmentId}`, values);
}

export const deleteDepartment = (departmentId) => {
    return SWAxios.delete(`${url}/${departmentId}`);
}