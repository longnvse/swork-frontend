import {SWAxios} from "../../system/axios";

export const urlFile = "swork/common-file-rest/v1.0/files";
const urlFileManager = "swork/common-file-rest/v1.0/file-managers";

export const getFilePages = (params) => {
    return SWAxios.get(urlFileManager, {params});
}

export const uploadFile = (projectId, phaseId, workId, multipartBody, config) => {
    return SWAxios.post(urlFile,
        multipartBody,
        {
            ...config,
            params: {projectId, phaseId, workId},
            headers: {
                'Content-Type': "multipart/form-data"
            }
        });
}
export const deleteFiles = (params) => {
    return SWAxios.delete(`${urlFileManager}?${params}`);
}