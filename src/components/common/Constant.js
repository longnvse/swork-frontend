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
    "active": "Đang thực hiện",
    "inactive": "Tạm dừng",
    "pending": "Chờ thực hiện",
    "completed": "Hoàn thành",
    "denied": "Đã huỷ"
}

export const STATUS_ARRAY = [PENDING, ACTIVE, COMPLETED, INACTIVE, DENIED]

export const message_error = (error) => {
    message.error(error.response?.data?.detail ||
        error.response?.data?.title ||
        "Đã có lỗi xảy ra vui lòng thử lại sau ít phút!");

}
