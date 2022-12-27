import {SWAxios} from "../../system/axios";

const url = "swork/notification-rest/v2.0/notification"
const urlCount = "swork/notification-rest/v2.0/notification-count"
export const getNotification = (params) => {
    return SWAxios.get(url, {params});
}

export const getNotificationCount = (params) => {
    return SWAxios.get(urlCount, {params});
}

export const updateStatusNotification = (id,value) =>{
    return SWAxios.put(url + `/${id}`,value)
}





