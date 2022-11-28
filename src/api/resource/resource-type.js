import {SWAxios} from "../../system/axios";

const url = "swork/resource-rest/v1.0/resource-types";

export const getResourceTypePages = (params) => {
    return SWAxios.get(url, {params: {page: 1, pageSize: 1000, ...params}});
}

export const getResourceType = (resourceTypeId) => {
    return SWAxios.get(`${url}/${resourceTypeId}`);
}

export const addResourceType = (values) => {
    return SWAxios.post(url, values);
}

export const updateResourceType = (resourceTypeId, values) => {
    return SWAxios.put(`${url}/${resourceTypeId}`, values);
}

export const deleteResourceType = (resourceTypeId) => {
    return SWAxios.delete(`${url}/${resourceTypeId}`);
}