import {Tag} from "antd";
import {ACTIVE, COMPLETED, DENIED, INACTIVE, PENDING} from "../Constant";

export const renderStatus = (status) => {
    switch (status) {
        case PENDING:
            return renderTag("Chờ thực hiện", "volcano");
        case ACTIVE:
            return renderTag("Đang thực hiện", "geekblue");
        case INACTIVE:
            return renderTag("Tạm dừng");
        case DENIED:
            return renderTag("Huỷ", "error");
        case COMPLETED:
            return renderTag("Hoàn thành", "success");

    }
};

export const statusString = (status) => {
    switch (status) {
        case PENDING : {
            return "Chờ thực hiện"
        }
        case ACTIVE : {
            return "Đang thực hiện"
        }
        case COMPLETED : {
            return "Hoàn thành"
        }
        case INACTIVE : {
            return "Tạm dừng"
        }
        case DENIED : {
            return "Huỷ"
        }
        default : {
            return ""
        }
    }
};

export const statusColor = (status) => {

    switch (status) {
        case PENDING : {
            return 'rgba(255, 119, 35, 0.6)'
        }
        case ACTIVE : {
            return 'rgba(53, 130, 255, 0.6)'
        }
        case COMPLETED : {
            return 'rgba(87, 89, 239, 0.6)'
        }
        case INACTIVE : {
            return 'rgba(209, 209, 209, 0.6)'
        }
        case DENIED : {
            return 'rgba(233, 10, 53, 0.6)'
        }
        default : {
            return '#000000'
        }
    }
};

const renderTag = (title, color) => {
    return <Tag style={{borderRadius: 14, height: 28}} className={"flex items-center w-fit border-none  cursor-pointer"}
                color={color}>{title}</Tag>
}
