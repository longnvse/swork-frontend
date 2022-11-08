import {Tag} from "antd";
import {ACTIVE, INACTIVE, PENDING} from "../Constant";

export const renderStatus = (status) => {
    switch (status) {
        case PENDING:
            return renderTag("Chờ duyệt", "warning");
        case ACTIVE:
            return renderTag("Đang hoạt động", "success");
        case INACTIVE:
            return renderTag("Dừng hoạt động", "error");

    }
}

const renderTag = (title, color) => {
    return <Tag style={{borderRadius: 14, height: 28}} className={"flex items-center w-fit border-none  cursor-pointer"}
                color={color}>{title}</Tag>
}
