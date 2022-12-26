import {Tag} from "antd";
import {ACTIVE, CLOSED, COMPLETED, DENIED, INACTIVE, PENDING} from "../Constant";

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
        case CLOSED:
            return renderTag("Đóng", "rgba(16, 177, 57, 0.2)");
    }
};

export const statusString = (status) => {
    switch (status) {
        case PENDING: {
            return "Chờ thực hiện";
        }
        case ACTIVE: {
            return "Đang thực hiện";
        }
        case COMPLETED: {
            return "Hoàn thành";
        }
        case INACTIVE: {
            return "Tạm dừng";
        }
        case DENIED: {
            return "Huỷ";
        }
        case CLOSED: {
            return "Đóng"
        }
        default: {
            return "";
        }
    }
};

export const statusColor = (status) => {
    switch (status) {
        case PENDING: {
            return "rgba(255, 119, 35, 0.6)";
        }
        case ACTIVE: {
            return "rgba(53, 130, 255, 0.6)";
        }
        case COMPLETED: {
            return "rgba(87, 89, 239, 0.6)";
        }
        case INACTIVE: {
            return "rgba(209, 209, 209, 0.6)";
        }
        case DENIED: {
            return "rgba(233, 10, 53, 0.6)";
        }
        default: {
            return "#000000";
        }
    }
};

export const statusColorKanban = (status) => {
    switch (status) {
        case PENDING: {
            return "rgba(255, 119, 35, 0.6)";
        }
        case ACTIVE: {
            return "rgba(53, 130, 255, 0.6)";
        }
        case COMPLETED: {
            return "rgba(87, 89, 239, 0.6)";
        }
        case INACTIVE: {
            return "rgb(100,96,96)";
        }
        case DENIED: {
            return "rgba(233, 10, 53, 0.6)";
        }
        default: {
            return "#000000";
        }
    }
};

export const statusBgColorKanban = (status) => {
    switch (status) {
        case PENDING: {
            return "rgb(255, 218, 185)";
        }
        case ACTIVE: {
            return "rgb(240, 248, 255)";
        }
        case COMPLETED: {
            return "rgb(235, 224, 253)";
        }
        case INACTIVE: {
            return "rgba(209, 209, 209, 0.3)";
        }
        case DENIED: {
            return "rgb(255, 199, 199)";
        }
        default: {
            return "#000000";
        }
    }
};

export const statusColorGanttChartSelected = (status) => {
    switch (status) {
        case PENDING: {
            return "rgba(255, 119, 35, 0.8)";
        }
        case ACTIVE: {
            return "rgba(53, 130, 255, 0.8)";
        }
        case COMPLETED: {
            return "rgba(87, 89, 239, 0.8)";
        }
        case INACTIVE: {
            return "rgba(209, 209, 209, 0.8)";
        }
        case DENIED: {
            return "rgba(233, 10, 53, 0.8)";
        }
        default: {
            return "#000000";
        }
    }
};

export const progressColorGanttChart = (status) => {
    switch (status) {
        case PENDING: {
            return "rgb(126,48,2)";
        }
        case ACTIVE: {
            return "rgb(2,52,138)";
        }
        case COMPLETED: {
            return "rgb(2,4,143)";
        }
        case INACTIVE: {
            return "rgb(124,112,112)";
        }
        case DENIED: {
            return "rgb(112,0,23)";
        }
        default: {
            return "#251f1f";
        }
    }
};

export const statusColorGanttChart = (status) => {
    switch (status) {
        case PENDING: {
            return "rgba(255, 119, 35)";
        }
        case ACTIVE: {
            return "rgba(53, 130, 255)";
        }
        case COMPLETED: {
            return "rgba(87, 89, 239)";
        }
        case INACTIVE: {
            return "rgba(209, 209, 209)";
        }
        case DENIED: {
            return "rgba(233, 10, 53)";
        }
        default: {
            return "#000000";
        }
    }
};

export const renderTag = (title, color) => {
    return (
        <Tag
            style={{borderRadius: 14, height: 28}}
            className={
                "flex items-center w-fit border-none  cursor-pointer m-0"
            }
            color={color}
        >
            {title}
        </Tag>
    );
};
