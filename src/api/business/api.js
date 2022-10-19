import {SWAxios} from "../../system/axios";

const url = "swork/business-rest/v1.0/business";

export const getBusinessPages = (params) => {
    return SWAxios.get(url, {params});
}

export const getBusiness = (businessId) => {
    return SWAxios.get(`${url}/${businessId}`);
}

export const addBusiness = (values) => {
    return SWAxios.post(url, values);
}

export const updateBusiness = (businessId, values) => {
    return SWAxios.put(`${url}/${businessId}`, values);
}

export const deleteBusiness = (businessId) => {
    return SWAxios.delete(`${url}/${businessId}`);
}