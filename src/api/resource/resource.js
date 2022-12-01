import { SWAxios } from "../../system/axios";

const url = "swork/resource-rest/v1.0/resources";

export const getResourcePages = (params) => {
    return SWAxios.get(url, { params: { page: 1, pageSize: 1000, ...params } });
};

export const getResource = (resourceId) => {
    return SWAxios.get(`${url}/${resourceId}`);
};

export const addResource = (values) => {
    return SWAxios.post(url, values);
};

export const updateResource = (resourceId, values) => {
    return SWAxios.put(`${url}/${resourceId}`, values);
};

export const deleteResource = (resourceId) => {
    return SWAxios.delete(`${url}/${resourceId}`);
};
