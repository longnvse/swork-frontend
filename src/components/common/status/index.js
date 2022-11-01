import {Tag} from "antd";
import {ACTIVE, INACTIVE, PENDING} from "../Constant";

export const renderStatus = (status) => {
    switch (status) {
        case PENDING:
            return <Tag color={"warning"}>Chờ duyệt</Tag>
        case ACTIVE:
            return <Tag color={"success"}>Đang hoạt động</Tag>
        case INACTIVE:
            return <Tag color={"error"}>Dừng hoạt động</Tag>
    }
}