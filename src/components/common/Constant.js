import {message} from "antd";

export const ADD = "add";
export const UPDATE = "update";
export const INFORMATION = "information";
export const PENDING = "pending";
export const ACTIVE = "active";
export const INACTIVE = "inactive";
export const DENIED = "denied";
export const COMPLETED = "completed";
export const DATE_FORMAT = "DD-MM-YYYY"
export const STATUS = {
    "pending": "Chờ thực hiện",
    "active": "Đang thực hiện",
    "inactive": "Tạm dừng",
    "completed": "Hoàn thành",
    "denied": "Đã huỷ"
}

export const progressTypeString = {
    "manual": "Người dùng tự cập nhập tiến độ",
    "averageWorks": "Theo bình quân % hoàn thành công việc",
    "proportionDate": "Theo tỷ trọng ngày thực hiện công việc",
    "byAmount": "Theo tỷ lệ hoàn thành khối lượng công việc"
}

export const STATUS_ARRAY = [PENDING, ACTIVE, COMPLETED, INACTIVE, DENIED]

export const CLASS_PK_NAME = {
    PROJECT: "project",
    PHASE: "phase",
    WORK: "work"
}

export const homePageByRole = {
    "superAdmin": "/business",
    "admin": "/account",
    "user": "/project/all"
}

export const MODULE_ID = {
    PROJECT: "project",
    PHASE: "phase",
    WORK: "work",
    USER: "USER",
    BUSINESS: "BUSINESS"
}
export const message_error = (error) => {
    message.error(error.response?.data?.detail ||
        error.response?.data?.title ||
        "Đã có lỗi xảy ra vui lòng thử lại sau ít phút!");

}

export const formatBytes = (bytes, decimals = 2) => {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

