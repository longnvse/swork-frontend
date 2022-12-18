import {SWAxios} from "../../system/axios";

const url = "swork/common-comment-rest/v1.0/comments";

export const getCommentPages = (classPkId, classPkName) => {
    return SWAxios.get(url, {params: {classPkId, classPkName}});
}

export const getComment = (commentId) => {
    return SWAxios.get(`${url}/${commentId}`);
}

export const addComment = (values) => {
    return SWAxios.post(url, values);
}

export const updateComment = (commentId, values) => {
    return SWAxios.put(`${url}/${commentId}`, values);
}

export const deleteComment = (commentId) => {
    return SWAxios.delete(`${url}/${commentId}`);
}